import type { ScoreRowData } from '@mastra/core/scores';
import { ScoresStorage } from '@mastra/core/storage';
import type { Redis } from '@upstash/redis';
import type { StoreOperationsUpstash } from '../operations/index.js';
export declare class ScoresUpstash extends ScoresStorage {
    private client;
    private operations;
    constructor({ client, operations }: {
        client: Redis;
        operations: StoreOperationsUpstash;
    });
    getScoreById({ id }: {
        id: string;
    }): Promise<ScoreRowData | null>;
    getScoresByScorerId({ scorerId, pagination, }: {
        scorerId: string;
        pagination?: {
            page: number;
            perPage: number;
        };
    }): Promise<{
        scores: ScoreRowData[];
        pagination: {
            total: number;
            page: number;
            perPage: number;
            hasMore: boolean;
        };
    }>;
    saveScore(score: ScoreRowData): Promise<{
        score: ScoreRowData;
    }>;
    getScoresByRunId({ runId, pagination, }: {
        runId: string;
        pagination?: {
            page: number;
            perPage: number;
        };
    }): Promise<{
        scores: ScoreRowData[];
        pagination: {
            total: number;
            page: number;
            perPage: number;
            hasMore: boolean;
        };
    }>;
    getScoresByEntityId({ entityId, entityType, pagination, }: {
        entityId: string;
        entityType?: string;
        pagination?: {
            page: number;
            perPage: number;
        };
    }): Promise<{
        scores: ScoreRowData[];
        pagination: {
            total: number;
            page: number;
            perPage: number;
            hasMore: boolean;
        };
    }>;
}
//# sourceMappingURL=index.d.ts.map