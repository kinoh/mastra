import type { ScoreRowData } from '@mastra/core/scores';
import { ScoresStorage } from '@mastra/core/storage';
import type { StoragePagination, PaginationInfo } from '@mastra/core/storage';
import type Cloudflare from 'cloudflare';
import type { StoreOperationsD1 } from '../operations/index.js';
export type D1QueryResult = Awaited<ReturnType<Cloudflare['d1']['database']['query']>>['result'];
export interface D1Client {
    query(args: {
        sql: string;
        params: string[];
    }): Promise<{
        result: D1QueryResult;
    }>;
}
export declare class ScoresStorageD1 extends ScoresStorage {
    private operations;
    constructor({ operations }: {
        operations: StoreOperationsD1;
    });
    getScoreById({ id }: {
        id: string;
    }): Promise<ScoreRowData | null>;
    saveScore(score: Omit<ScoreRowData, 'createdAt' | 'updatedAt'>): Promise<{
        score: ScoreRowData;
    }>;
    getScoresByScorerId({ scorerId, pagination, }: {
        scorerId: string;
        pagination: StoragePagination;
    }): Promise<{
        pagination: PaginationInfo;
        scores: ScoreRowData[];
    }>;
    getScoresByRunId({ runId, pagination, }: {
        runId: string;
        pagination: StoragePagination;
    }): Promise<{
        pagination: PaginationInfo;
        scores: ScoreRowData[];
    }>;
    getScoresByEntityId({ entityId, entityType, pagination, }: {
        pagination: StoragePagination;
        entityId: string;
        entityType: string;
    }): Promise<{
        pagination: PaginationInfo;
        scores: ScoreRowData[];
    }>;
}
//# sourceMappingURL=index.d.ts.map