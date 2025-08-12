import type { PaginationInfo, StorageGetTracesArg, StorageGetTracesPaginatedArg } from '@mastra/core/storage';
import { TracesStorage } from '@mastra/core/storage';
import type { Trace } from '@mastra/core/telemetry';
import type { StoreOperationsMongoDB } from '../operations/index.js';
export declare class TracesStorageMongoDB extends TracesStorage {
    private operations;
    constructor({ operations }: {
        operations: StoreOperationsMongoDB;
    });
    getTraces(args: StorageGetTracesArg): Promise<Trace[]>;
    getTracesPaginated(args: StorageGetTracesPaginatedArg): Promise<PaginationInfo & {
        traces: Trace[];
    }>;
    batchTraceInsert({ records }: {
        records: Record<string, any>[];
    }): Promise<void>;
}
//# sourceMappingURL=index.d.ts.map