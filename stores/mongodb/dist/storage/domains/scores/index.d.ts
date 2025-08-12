import type { ScoreRowData } from '@mastra/core/scores';
import { ScoresStorage } from '@mastra/core/storage';
import type { PaginationInfo, StoragePagination } from '@mastra/core/storage';
import type { StoreOperationsMongoDB } from '../operations/index.js';
export declare class ScoresStorageMongoDB extends ScoresStorage {
    private operations;
    constructor({ operations }: {
        operations: StoreOperationsMongoDB;
    });
    getScoreById({ id }: {
        id: string;
    }): Promise<ScoreRowData | null>;
    saveScore(score: Omit<ScoreRowData, 'id' | 'createdAt' | 'updatedAt'>): Promise<{
        score: ScoreRowData;
    }>;
    getScoresByScorerId({ scorerId, pagination, entityId, entityType, }: {
        scorerId: string;
        pagination: StoragePagination;
        entityId?: string;
        entityType?: string;
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