import { TracesStorage } from '@mastra/core/storage';
import type { StorageGetTracesArg, StorageGetTracesPaginatedArg, PaginationInfo } from '@mastra/core/storage';
import type { Trace } from '@mastra/core/telemetry';
import type { StoreOperationsCloudflare } from '../operations/index.js';
export declare class TracesStorageCloudflare extends TracesStorage {
    private operations;
    constructor({ operations }: {
        operations: StoreOperationsCloudflare;
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