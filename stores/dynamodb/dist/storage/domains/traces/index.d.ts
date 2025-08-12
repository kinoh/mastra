import { TracesStorage } from '@mastra/core/storage';
import type { PaginationInfo, StorageGetTracesPaginatedArg } from '@mastra/core/storage';
import type { Trace } from '@mastra/core/telemetry';
import type { Service } from 'electrodb';
import type { StoreOperationsDynamoDB } from '../operations/index.js';
export declare class TracesStorageDynamoDB extends TracesStorage {
    private service;
    private operations;
    constructor({ service, operations }: {
        service: Service<Record<string, any>>;
        operations: StoreOperationsDynamoDB;
    });
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
    getTracesPaginated(args: StorageGetTracesPaginatedArg): Promise<PaginationInfo & {
        traces: Trace[];
    }>;
}
//# sourceMappingURL=index.d.ts.map