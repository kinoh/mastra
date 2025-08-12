import type { MastraMessageContentV2 } from '@mastra/core/agent';
import type { StorageThreadType, MastraMessageV1, MastraMessageV2 } from '@mastra/core/memory';
import type { ScoreRowData } from '@mastra/core/scores';
import { MastraStorage } from '@mastra/core/storage';
import type { TABLE_NAMES, StorageColumn, StorageGetMessagesArg, EvalRow, WorkflowRuns, WorkflowRun, StorageGetTracesPaginatedArg, PaginationInfo, StoragePagination, PaginationArgs, StorageDomains, StorageResourceType } from '@mastra/core/storage';
import type { Trace } from '@mastra/core/telemetry';
import type { WorkflowRunState } from '@mastra/core/workflows';
import type { CloudflareStoreConfig, RecordTypes } from './types.js';
export declare class CloudflareStore extends MastraStorage {
    stores: StorageDomains;
    private client?;
    private accountId?;
    private namespacePrefix;
    private bindings?;
    private validateWorkersConfig;
    private validateRestConfig;
    constructor(config: CloudflareStoreConfig);
    createTable({ tableName, schema, }: {
        tableName: TABLE_NAMES;
        schema: Record<string, StorageColumn>;
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
    insert<T extends TABLE_NAMES>({ tableName, record, }: {
        tableName: T;
        record: Record<string, any>;
    }): Promise<void>;
    load<R>({ tableName, keys }: {
        tableName: TABLE_NAMES;
        keys: Record<string, string>;
    }): Promise<R | null>;
    getThreadById({ threadId }: {
        threadId: string;
    }): Promise<StorageThreadType | null>;
    getThreadsByResourceId({ resourceId }: {
        resourceId: string;
    }): Promise<StorageThreadType[]>;
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
    getMessages(args: StorageGetMessagesArg & {
        format?: 'v1';
    }): Promise<MastraMessageV1[]>;
    getMessages(args: StorageGetMessagesArg & {
        format: 'v2';
    }): Promise<MastraMessageV2[]>;
    persistWorkflowSnapshot(params: {
        workflowName: string;
        runId: string;
        snapshot: WorkflowRunState;
    }): Promise<void>;
    loadWorkflowSnapshot(params: {
        workflowName: string;
        runId: string;
    }): Promise<WorkflowRunState | null>;
    batchInsert<T extends TABLE_NAMES>(input: {
        tableName: T;
        records: Partial<RecordTypes[T]>[];
    }): Promise<void>;
    getTraces({ name, scope, page, perPage, attributes, fromDate, toDate, }: {
        name?: string;
        scope?: string;
        page: number;
        perPage: number;
        attributes?: Record<string, string>;
        fromDate?: Date;
        toDate?: Date;
    }): Promise<any[]>;
    getEvalsByAgentName(agentName: string, type?: 'test' | 'live'): Promise<EvalRow[]>;
    getEvals(options: {
        agentName?: string;
        type?: 'test' | 'live';
        dateRange?: {
            start?: Date;
            end?: Date;
        };
    } & PaginationArgs): Promise<PaginationInfo & {
        evals: EvalRow[];
    }>;
    getWorkflowRuns({ workflowName, limit, offset, resourceId, fromDate, toDate, }?: {
        workflowName?: string;
        limit?: number;
        offset?: number;
        resourceId?: string;
        fromDate?: Date;
        toDate?: Date;
    }): Promise<WorkflowRuns>;
    getWorkflowRunById({ runId, workflowName, }: {
        runId: string;
        workflowName: string;
    }): Promise<WorkflowRun | null>;
    getTracesPaginated(args: StorageGetTracesPaginatedArg): Promise<PaginationInfo & {
        traces: Trace[];
    }>;
    getThreadsByResourceIdPaginated(args: {
        resourceId: string;
        page: number;
        perPage: number;
    }): Promise<PaginationInfo & {
        threads: StorageThreadType[];
    }>;
    getMessagesPaginated(args: StorageGetMessagesArg): Promise<PaginationInfo & {
        messages: MastraMessageV1[] | MastraMessageV2[];
    }>;
    updateMessages(args: {
        messages: Partial<Omit<MastraMessageV2, 'createdAt'>> & {
            id: string;
            content?: {
                metadata?: MastraMessageContentV2['metadata'];
                content?: MastraMessageContentV2['content'];
            };
        }[];
    }): Promise<MastraMessageV2[]>;
    getScoreById({ id }: {
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
    close(): Promise<void>;
}
//# sourceMappingURL=index.d.ts.map