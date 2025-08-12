import type { ScorerRunInputForAgent, ScorerRunOutputForAgent } from '@mastra/core/scores';
export declare function createCompletenessScorer(): import("@mastra/core/scores").MastraScorer<Record<"preprocessStepResult", {
    inputElements: string[];
    outputElements: string[];
    missingElements: string[];
    elementCounts: {
        input: number;
        output: number;
    };
}> & Record<"generateScoreStepResult", number>, ScorerRunInputForAgent, ScorerRunOutputForAgent>;
//# sourceMappingURL=index.d.ts.map