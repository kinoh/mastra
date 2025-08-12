import type { ScoreRowData } from '@mastra/core/scores';
import { ScoresStorage } from '@mastra/core/storage';
import type { StoragePagination, PaginationInfo } from '@mastra/core/storage';
import type { StoreOperationsCloudflare } from '../operations/index.js';
export declare class ScoresStorageCloudflare extends ScoresStorage {
    private operations;
    constructor({ operations }: {
        operations: StoreOperationsCloudflare;
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