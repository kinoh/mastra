import type { D1Database } from '@cloudflare/workers-types';
import type { MastraMessageContentV2 } from '@mastra/core/agent';
import type { StorageThreadType, MastraMessageV1, MastraMessageV2 } from '@mastra/core/memory';
import type { ScoreRowData } from '@mastra/core/scores';
import { MastraStorage } from '@mastra/core/storage';
import type { EvalRow, PaginationInfo, StorageColumn, StorageGetMessagesArg, StorageGetTracesPaginatedArg, StorageResourceType, TABLE_NAMES, WorkflowRun, StoragePagination, WorkflowRuns, StorageDomains, PaginationArgs } from '@mastra/core/storage';
import type { Trace } from '@mastra/core/telemetry';
import type { WorkflowRunState } from '@mastra/core/workflows';
import Cloudflare from 'cloudflare';
/**
 * Configuration for D1 using the REST API
 */
export interface D1Config {
    /** Cloudflare account ID */
    accountId: string;
    /** Cloudflare API token with D1 access */
    apiToken: string;
    /** D1 database ID */
    databaseId: string;
    /** Optional prefix for table names */
    tablePrefix?: string;
}
export interface D1ClientConfig {
    /** Optional prefix for table names */
    tablePrefix?: string;
    /** D1 Client */
    client: D1Client;
}
/**
 * Configuration for D1 using the Workers Binding API
 */
export interface D1WorkersConfig {
    /** D1 database binding from Workers environment */
    binding: D1Database;
    /** Optional prefix for table names */
    tablePrefix?: string;
}
/**
 * Combined configuration type supporting both REST API and Workers Binding API
 */
export type D1StoreConfig = D1Config | D1WorkersConfig | D1ClientConfig;
export type D1QueryResult = Awaited<ReturnType<Cloudflare['d1']['database']['query']>>['result'];
export interface D1Client {
    query(args: {
        sql: string;
        params: string[];
    }): Promise<{
        result: D1QueryResult;
    }>;
}
export declare class D1Store extends MastraStorage {
    private client?;
    private binding?;
    private tablePrefix;
    stores: StorageDomains;
    /**
     * Creates a new D1Store instance
     * @param config Configuration for D1 access (either REST API or Workers Binding API)
     */
    constructor(config: D1StoreConfig);
    get supports(): {
        selectByIncludeResourceScope: boolean;
        resourceWorkingMemory: boolean;
        hasColumn: boolean;
        createTable: boolean;
        deleteMessages: boolean;
    };
    createTable({ tableName, schema, }: {
        tableName: TABLE_NAMES;
        schema: Record<string, StorageColumn>;
    }): Promise<void>;
    /**
     * Alters table schema to add columns if they don't exist
     * @param tableName Name of the table
     * @param schema Schema of the table
     * @param ifNotExists Array of column names to add if they don't exist
     */
    alterTable({ tableName, schema, ifNotExists, }: {
        tableName: TABLE_NAMES;
        schema: Record<string, StorageColumn>;
        ifNotExists: string[];
    }): Promise<void>;
    clearTable({ tableName }: {
        tableName: TABLE_NAMES;
    }): Promise<void>;
    dropTable({ tableName }: {
        tableName: TABLE_NAMES;
    }): Promise<void>;
    hasColumn(table: string, column: string): Promise<boolean>;
    insert({ tableName, record }: {
        tableName: TABLE_NAMES;
        record: Record<string, any>;
    }): Promise<void>;
    load<R>({ tableName, keys }: {
        tableName: TABLE_NAMES;
        keys: Record<string, string>;
    }): Promise<R | null>;
    getThreadById({ threadId }: {
        threadId: string;
    }): Promise<StorageThreadType | null>;
    /**
     * @deprecated use getThreadsByResourceIdPaginated instead
     */
    getThreadsByResourceId({ resourceId }: {
        resourceId: string;
    }): Promise<StorageThreadType[]>;
    getThreadsByResourceIdPaginated(args: {
        resourceId: string;
        page: number;
        perPage: number;
    }): Promise<PaginationInfo & {
        threads: StorageThreadType[];
    }>;
    saveThread({ thread }: {
        thread: StorageThreadType;
    }): Promise<StorageThreadType>;
    updateThread({ id, title, metadata, }: {
        id: string;
        title: string;
        metadata: Record<string, unknown>;
    }): Promise<StorageThreadType>;
    deleteThread({ threadId }: {
        threadId: string;
    }): Promise<void>;
    saveMessages(args: {
        messages: MastraMessageV1[];
        format?: undefined | 'v1';
    }): Promise<MastraMessageV1[]>;
    saveMessages(args: {
        messages: MastraMessageV2[];
        format: 'v2';
    }): Promise<MastraMessageV2[]>;
    /**
     * @deprecated use getMessagesPaginated instead
     */
    getMessages(args: StorageGetMessagesArg & {
        format?: 'v1';
    }): Promise<MastraMessageV1[]>;
    getMessages(args: StorageGetMessagesArg & {
        format: 'v2';
    }): Promise<MastraMessageV2[]>;
    getMessagesPaginated({ threadId, selectBy, format, }: StorageGetMessagesArg & {
        format?: 'v1' | 'v2';
    }): Promise<PaginationInfo & {
        messages: MastraMessageV1[] | MastraMessageV2[];
    }>;
    persistWorkflowSnapshot({ workflowName, runId, snapshot, }: {
        workflowName: string;
        runId: string;
        snapshot: WorkflowRunState;
    }): Promise<void>;
    loadWorkflowSnapshot(params: {
        workflowName: string;
        runId: string;
    }): Promise<WorkflowRunState | null>;
    getWorkflowRuns({ workflowName, fromDate, toDate, limit, offset, resourceId, }?: {
        workflowName?: string;
        fromDate?: Date;
        toDate?: Date;
        limit?: number;
        offset?: number;
        resourceId?: string;
    }): Promise<WorkflowRuns>;
    getWorkflowRunById({ runId, workflowName, }: {
        runId: string;
        workflowName?: string;
    }): Promise<WorkflowRun | null>;
    /**
     * Insert multiple records in a batch operation
     * @param tableName The table to insert into
     * @param records The records to insert
     */
    batchInsert({ tableName, records }: {
        tableName: TABLE_NAMES;
        records: Record<string, any>[];
    }): Promise<void>;
    /**
     * @deprecated use getTracesPaginated instead
     */
    getTraces(args: {
        name?: string;
        scope?: string;
        page: number;
        perPage: number;
        attributes?: Record<string, string>;
        fromDate?: Date;
        toDate?: Date;
    }): Promise<Trace[]>;
    getTracesPaginated(args: StorageGetTracesPaginatedArg): Promise<PaginationInfo & {
        traces: Trace[];
    }>;
    /**
     * @deprecated use getEvals instead
     */
    getEvalsByAgentName(agentName: string, type?: 'test' | 'live'): Promise<EvalRow[]>;
    getEvals(options: {
        agentName?: string;
        type?: 'test' | 'live';
    } & PaginationArgs): Promise<PaginationInfo & {
        evals: EvalRow[];
    }>;
    updateMessages(_args: {
        messages: Partial<Omit<MastraMessageV2, 'createdAt'>> & {
            id: string;
            content?: {
                metadata?: MastraMessageContentV2['metadata'];
                content?: MastraMessageContentV2['content'];
            };
        }[];
    }): Promise<MastraMessageV2[]>;
    getResourceById({ resourceId }: {
        resourceId: string;
    }): Promise<StorageResourceType | null>;
    saveResource({ resource }: {
        resource: StorageResourceType;
    }): Promise<StorageResourceType>;
    updateResource({ resourceId, workingMemory, metadata, }: {
        resourceId: string;
        workingMemory?: string;
        metadata?: Record<string, unknown>;
    }): Promise<StorageResourceType>;
    getScoreById({ id: _id }: {
        id: string;
    }): Promise<ScoreRowData | null>;
    saveScore(_score: ScoreRowData): Promise<{
        score: ScoreRowData;
    }>;
    getScoresByRunId({ runId: _runId, pagination: _pagination, }: {
        runId: string;
        pagination: StoragePagination;
    }): Promise<{
        pagination: PaginationInfo;
        scores: ScoreRowData[];
    }>;
    getScoresByEntityId({ entityId: _entityId, entityType: _entityType, pagination: _pagination, }: {
        pagination: StoragePagination;
        entityId: string;
        entityType: string;
    }): Promise<{
        pagination: PaginationInfo;
        scores: ScoreRowData[];
    }>;
    getScoresByScorerId({ scorerId: _scorerId, pagination: _pagination, }: {
        scorerId: string;
        pagination: StoragePagination;
    }): Promise<{
        pagination: PaginationInfo;
        scores: ScoreRowData[];
    }>;
    /**
     * Close the database connection
     * No explicit cleanup needed for D1 in either REST or Workers Binding mode
     */
    close(): Promise<void>;
}
//# sourceMappingURL=index.d.ts.map