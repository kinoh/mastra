import type { ScoreRowData } from '@mastra/core/scores';
import { ScoresStorage } from '@mastra/core/storage';
import type { PaginationInfo, StoragePagination } from '@mastra/core/storage';
import type { Service } from 'electrodb';
export declare class ScoresStorageDynamoDB extends ScoresStorage {
    private service;
    constructor({ service }: {
        service: Service<Record<string, any>>;
    });
    private parseScoreData;
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
        entityId: string;
        entityType: string;
        pagination: StoragePagination;
    }): Promise<{
        pagination: PaginationInfo;
        scores: ScoreRowData[];
    }>;
}
//# sourceMappingURL=index.d.ts.map