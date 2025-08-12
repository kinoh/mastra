import { ScoringEntityType } from '@mastra/core/scores';
export interface ScorerListProps {
    entityId: string;
    entityType: ScoringEntityType;
}
export declare const ScorerList: ({ entityId, entityType }: ScorerListProps) => import("react/jsx-runtime").JSX.Element;
export declare const EmptyScorerList: () => import("react/jsx-runtime").JSX.Element;
export declare const ScorerSkeleton: () => import("react/jsx-runtime").JSX.Element;
