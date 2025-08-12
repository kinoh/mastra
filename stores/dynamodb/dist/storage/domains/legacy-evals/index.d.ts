import type { EvalRow, PaginationArgs, PaginationInfo } from '@mastra/core/storage';
import { LegacyEvalsStorage } from '@mastra/core/storage';
import type { Service } from 'electrodb';
export declare class LegacyEvalsDynamoDB extends LegacyEvalsStorage {
    service: Service<Record<string, any>>;
    tableName: string;
    constructor({ service, tableName }: {
        service: Service<Record<string, any>>;
        tableName: string;
    });
    getEvalsByAgentName(agentName: string, type?: 'test' | 'live'): Promise<EvalRow[]>;
    getEvals(options?: {
        agentName?: string;
        type?: 'test' | 'live';
    } & PaginationArgs): Promise<PaginationInfo & {
        evals: EvalRow[];
    }>;
}
//# sourceMappingURL=index.d.ts.map