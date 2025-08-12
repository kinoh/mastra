import type { MastraMessageContentV2, MastraMessageV2 } from '@mastra/core/agent';
import type { StorageThreadType, MastraMessageV1 } from '@mastra/core/memory';
import type { ScoreRowData } from '@mastra/core/scores';
import { MastraStorage } from '@mastra/core/storage';
import type { TABLE_NAMES, StorageColumn, StorageGetMessagesArg, StorageResourceType, EvalRow, WorkflowRuns, WorkflowRun, PaginationInfo, PaginationArgs, StorageGetTracesArg, StoragePagination, StorageDomains } from '@mastra/core/storage';
import type { WorkflowRunState } from '@mastra/core/workflows';
export interface UpstashConfig {
    url: string;
    token: string;
}
export declare class UpstashStore extends MastraStorage {
    private redis;
    stores: StorageDomains;
    constructor(config: UpstashConfig);
    get supports(): {
        selectByIncludeResourceScope: boolean;
        resourceWorkingMemory: boolean;
        hasColumn: boolean;
        createTable: boolean;
        deleteMessages: boolean;
    };
    /**
     * @deprecated Use getEvals instead
     */
    getEvalsByAgentName(agentName: string, type?: 'test' | 'live'): Promise<EvalRow[]>;
    /**
     * Get all evaluations with pagination and total count
     * @param options Pagination and filtering options
     * @returns Object with evals array and total count
     */
    getEvals(options: {
        agentName?: string;
        type?: 'test' | 'live';
    } & PaginationArgs): Promise<PaginationInfo & {
        evals: EvalRow[];
    }>;
    /**
     * @deprecated use getTracesPaginated instead
     */
    getTraces(args: StorageGetTracesArg): Promise<any[]>;
    getTracesPaginated(args: {
        name?: string;
        scope?: string;
        attributes?: Record<string, string>;
        filters?: Record<string, any>;
    } & PaginationArgs): Promise<PaginationInfo & {
        traces: any[];
    }>;
    batchTraceInsert(args: {
        records: Record<string, any>[];
    }): Promise<void>;
    createTable({ tableName, schema, }: {
        tableName: TABLE_NAMES;
        schema: Record<string, StorageColumn>;
    }): Promise<void>;
    /**
     * No-op: This backend is schemaless and does not require schema changes.
     * @param tableName Name of the table
     * @param schema Schema of the table
     * @param ifNotExists Array of column names to add if they don't exist
     */
    alterTable(args: {
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
    batchInsert(input: {
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
    getMessagesPaginated(args: StorageGetMessagesArg & {
        format?: 'v1' | 'v2';
    }): Promise<PaginationInfo & {
        messages: MastraMessageV1[] | MastraMessageV2[];
    }>;
    persistWorkflowSnapshot(params: {
        namespace: string;
        workflowName: string;
        runId: string;
        snapshot: WorkflowRunState;
    }): Promise<void>;
    loadWorkflowSnapshot(params: {
        namespace: string;
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
    close(): Promise<void>;
    updateMessages(args: {
        messages: (Partial<Omit<MastraMessageV2, 'createdAt'>> & {
            id: string;
            content?: {
                metadata?: MastraMessageContentV2['metadata'];
                content?: MastraMessageContentV2['content'];
            };
        })[];
    }): Promise<MastraMessageV2[]>;
    deleteMessages(messageIds: string[]): Promise<void>;
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
    saveScore(score: ScoreRowData): Promise<{
        score: ScoreRowData;
    }>;
    getScoresByRunId({ runId, pagination, }: {
        runId: string;
        pagination: StoragePagination;
    }): Promise<{
        pagination: PaginationInfo;
        scores: ScoreRowData[];
    }>;
    getScoresByEntityId({ entityId, entityType, pagination, }: {
        pagination: StoragePagination;
        entityId: string;
        entityType: string;
    }): Promise<{
        pagination: PaginationInfo;
        scores: ScoreRowData[];
    }>;
    getScoresByScorerId({ scorerId, pagination, }: {
        scorerId: string;
        pagination: StoragePagination;
    }): Promise<{
        pagination: PaginationInfo;
        scores: ScoreRowData[];
    }>;
}
//# sourceMappingURL=index.d.ts.map