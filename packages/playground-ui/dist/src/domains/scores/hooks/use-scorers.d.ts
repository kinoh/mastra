import { GetScorerResponse, GetScoresResponse } from '@mastra/client-js';
export declare const useScoresByEntityId: (entityId: string, entityType: string, page?: number) => {
    scores: GetScoresResponse | null;
    isLoading: boolean;
};
type UseScoresByScorerIdProps = {
    scorerId: string;
    page?: number;
    entityId?: string;
    entityType?: string;
};
export declare const useScoresByScorerId: ({ scorerId, page, entityId, entityType }: UseScoresByScorerIdProps) => {
    scores: GetScoresResponse | null;
    isLoading: boolean;
};
export declare const useScorer: (scorerId: string) => {
    scorer: GetScorerResponse | null;
    isLoading: boolean;
};
export declare const useScorers: () => {
    scorers: Record<string, GetScorerResponse>;
    isLoading: boolean;
};
export {};
