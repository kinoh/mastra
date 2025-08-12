import { LegacyEvalsStorage } from '@mastra/core/storage';
import type { PaginationArgs, PaginationInfo, EvalRow } from '@mastra/core/storage';
import type { StoreOperationsMongoDB } from '../operations/index.js';
export declare class LegacyEvalsMongoDB extends LegacyEvalsStorage {
    private operations;
    constructor({ operations }: {
        operations: StoreOperationsMongoDB;
    });
    /** @deprecated use getEvals instead */
    getEvalsByAgentName(agentName: string, type?: 'test' | 'live'): Promise<EvalRow[]>;
    getEvals(options?: {
        agentName?: string;
        type?: 'test' | 'live';
    } & PaginationArgs): Promise<PaginationInfo & {
        evals: EvalRow[];
    }>;
}
//# sourceMappingURL=index.d.ts.map