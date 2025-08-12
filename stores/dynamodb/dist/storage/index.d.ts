import type { MastraMessageContentV2 } from '@mastra/core/agent';
import type { StorageThreadType, MastraMessageV2, MastraMessageV1 } from '@mastra/core/memory';
import type { ScoreRowData } from '@mastra/core/scores';
import { MastraStorage } from '@mastra/core/storage';
import type { EvalRow, StorageGetMessagesArg, WorkflowRun, WorkflowRuns, TABLE_NAMES, StorageGetTracesArg, PaginationInfo, StorageColumn, StoragePagination, StorageDomains, PaginationArgs, StorageResourceType, ThreadSortOptions } from '@mastra/core/storage';
import type { Trace } from '@mastra/core/telemetry';
import type { WorkflowRunState } from '@mastra/core/workflows';
export interface DynamoDBStoreConfig {
    region?: string;
    tableName: string;
    endpoint?: string;
    credentials?: {
        accessKeyId: string;
        secretAccessKey: string;
    };
}
export declare class DynamoDBStore extends MastraStorage {
    private tableName;
    private client;
    private service;
    protected hasInitialized: Promise<boolean> | null;
    stores: StorageDomains;
    constructor({ name, config }: {
        name: string;
        config: DynamoDBStoreConfig;
    });
    get supports(): {
        selectByIncludeResourceScope: boolean;
        resourceWorkingMemory: boolean;
        hasColumn: boolean;
        createTable: boolean;
        deleteMessages: boolean;
    };
    /**
     * Validates that the required DynamoDB table exists and is accessible.
     * This does not check the table structure - it assumes the table
     * was created with the correct structure via CDK/CloudFormation.
     */
    private validateTableExists;
    /**
     * Initialize storage, validating the externally managed table is accessible.
     * For the single-table design, we only validate once that we can access
     * the table that was created via CDK/CloudFormation.
     */
    init(): Promise<void>;
    /**
     * Performs the actual table validation and stores the promise.
     * Handles resetting the stored promise on failure to allow retries.
     */
    private _performInitializationAndStore;
    createTable({ tableName, schema }: {
        tableName: TABLE_NAMES;
        schema: Record<string, any>;
    }): Promise<void>;
    alterTable(_args: {
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
    insert({ tableName, record }: {
        tableName: TABLE_NAMES;
        record: Record<string, any>;
    }): Promise<void>;
    batchInsert({ tableName, records }: {
        tableName: TABLE_NAMES;
        records: Record<string, any>[];
    }): Promise<void>;
    load<R>({ tableName, keys }: {
        tableName: TABLE_NAMES;
        keys: Record<string, string>;
    }): Promise<R | null>;
    getThreadById({ threadId }: {
        threadId: string;
    }): Promise<StorageThreadType | null>;
    getThreadsByResourceId(args: {
        resourceId: string;
    } & ThreadSortOptions): Promise<StorageThreadType[]>;
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
    getMessages(args: StorageGetMessagesArg & {
        format?: 'v1';
    }): Promise<MastraMessageV1[]>;
    getMessages(args: StorageGetMessagesArg & {
        format: 'v2';
    }): Promise<MastraMessageV2[]>;
    saveMessages(args: {
        messages: MastraMessageV1[];
        format?: undefined | 'v1';
    }): Promise<MastraMessageV1[]>;
    saveMessages(args: {
        messages: MastraMessageV2[];
        format: 'v2';
    }): Promise<MastraMessageV2[]>;
    getThreadsByResourceIdPaginated(args: {
        resourceId: string;
        page: number;
        perPage: number;
    } & ThreadSortOptions): Promise<PaginationInfo & {
        threads: StorageThreadType[];
    }>;
    getMessagesPaginated(args: StorageGetMessagesArg & {
        format?: 'v1' | 'v2';
    }): Promise<PaginationInfo & {
        messages: MastraMessageV1[] | MastraMessageV2[];
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
    getTraces(args: {
        name?: string;
        scope?: string;
        page: number;
        perPage: number;
        attributes?: Record<string, string>;
        filters?: Record<string, any>;
    }): Promise<any[]>;
    batchTraceInsert({ records }: {
        records: Record<string, any>[];
    }): Promise<void>;
    getTracesPaginated(_args: StorageGetTracesArg): Promise<PaginationInfo & {
        traces: Trace[];
    }>;
    persistWorkflowSnapshot({ workflowName, runId, snapshot, }: {
        workflowName: string;
        runId: string;
        snapshot: WorkflowRunState;
    }): Promise<void>;
    loadWorkflowSnapshot({ workflowName, runId, }: {
        workflowName: string;
        runId: string;
    }): Promise<WorkflowRunState | null>;
    getWorkflowRuns(args?: {
        workflowName?: string;
        fromDate?: Date;
        toDate?: Date;
        limit?: number;
        offset?: number;
        resourceId?: string;
    }): Promise<WorkflowRuns>;
    getWorkflowRunById(args: {
        runId: string;
        workflowName?: string;
    }): Promise<WorkflowRun | null>;
    getResourceById({ resourceId }: {
        resourceId: string;
    }): Promise<StorageResourceType | null>;
    saveResource({ resource }: {
        resource: StorageResourceType;
    }): Promise<StorageResourceType>;
    updateResource({ resourceId, workingMemory, metadata, }: {
        resourceId: string;
        workingMemory?: string;
        metadata?: Record<string, any>;
    }): Promise<StorageResourceType>;
    getEvalsByAgentName(agentName: string, type?: 'test' | 'live'): Promise<EvalRow[]>;
    getEvals(options: {
        agentName?: string;
        type?: 'test' | 'live';
    } & PaginationArgs): Promise<PaginationInfo & {
        evals: EvalRow[];
    }>;
    /**
     * Closes the DynamoDB client connection and cleans up resources.
     * Should be called when the store is no longer needed, e.g., at the end of tests or application shutdown.
     */
    close(): Promise<void>;
    /**
     * SCORERS - Not implemented
     */
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
}
//# sourceMappingURL=index.d.ts.map