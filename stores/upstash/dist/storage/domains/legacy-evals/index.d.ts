import type { EvalRow, PaginationArgs, PaginationInfo } from '@mastra/core/storage';
import { LegacyEvalsStorage } from '@mastra/core/storage';
import type { Redis } from '@upstash/redis';
import type { StoreOperationsUpstash } from '../operations/index.js';
export declare class StoreLegacyEvalsUpstash extends LegacyEvalsStorage {
    private client;
    private operations;
    constructor({ client, operations }: {
        client: Redis;
        operations: StoreOperationsUpstash;
    });
    /**
     * @deprecated Use getEvals instead
     */
    getEvalsByAgentName(agentName: string, type?: 'test' | 'live'): Promise<EvalRow[]>;
    /**
     * Get all evaluations with pagination and total count
     * @param options Pagination and filtering options
     * @returns Object with evals array and total count
     */
    getEvals(options?: {
        agentName?: string;
        type?: 'test' | 'live';
    } & PaginationArgs): Promise<PaginationInfo & {
        evals: EvalRow[];
    }>;
}
//# sourceMappingURL=index.d.ts.map