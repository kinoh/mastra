import { LegacyEvalsStorage } from '@mastra/core/storage';
import type { EvalRow, PaginationArgs, PaginationInfo } from '@mastra/core/storage';
import type { StoreOperationsCloudflare } from '../operations/index.js';
export declare class LegacyEvalsStorageCloudflare extends LegacyEvalsStorage {
    operations: StoreOperationsCloudflare;
    constructor({ operations }: {
        operations: StoreOperationsCloudflare;
    });
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
}
//# sourceMappingURL=index.d.ts.map