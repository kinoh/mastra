import type { StorageGetTracesArg, PaginationInfo, PaginationArgs } from '@mastra/core/storage';
import { TracesStorage } from '@mastra/core/storage';
import type { Redis } from '@upstash/redis';
import type { StoreOperationsUpstash } from '../operations/index.js';
export declare class TracesUpstash extends TracesStorage {
    private client;
    private operations;
    constructor({ client, operations }: {
        client: Redis;
        operations: StoreOperationsUpstash;
    });
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
}
//# sourceMappingURL=index.d.ts.map