import type { ScorerRunInputForAgent, ScorerRunOutputForAgent } from '@mastra/core/scores';
export declare function createKeywordCoverageScorer(): import("@mastra/core/scores").MastraScorer<Record<"preprocessStepResult", {
    result: {
        referenceKeywords: Set<string>;
        responseKeywords: Set<string>;
    };
    referenceKeywords?: undefined;
    responseKeywords?: undefined;
} | {
    referenceKeywords: Set<string>;
    responseKeywords: Set<string>;
    result?: undefined;
}> & Record<"analyzeStepResult", {
    totalKeywordsLength: number;
    matchedKeywordsLength: number;
}> & Record<"generateScoreStepResult", number>, ScorerRunInputForAgent, ScorerRunOutputForAgent>;
//# sourceMappingURL=index.d.ts.map