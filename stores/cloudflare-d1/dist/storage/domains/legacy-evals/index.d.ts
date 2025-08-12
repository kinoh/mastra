import { LegacyEvalsStorage } from '@mastra/core/storage';
import type { EvalRow, PaginationArgs, PaginationInfo } from '@mastra/core/storage';
import type { StoreOperationsD1 } from '../operations/index.js';
export declare class LegacyEvalsStorageD1 extends LegacyEvalsStorage {
    private operations;
    constructor({ operations }: {
        operations: StoreOperationsD1;
    });
    getEvals(options: {
        agentName?: string;
        type?: 'test' | 'live';
    } & PaginationArgs): Promise<PaginationInfo & {
        evals: EvalRow[];
    }>;
    /**
     * @deprecated use getEvals instead
     */
    getEvalsByAgentName(agentName: string, type?: 'test' | 'live'): Promise<EvalRow[]>;
}
//# sourceMappingURL=index.d.ts.map