import type { ScorerRunInputForAgent, ScorerRunOutputForAgent } from '@mastra/core/scores';
export declare function createTextualDifferenceScorer(): import("@mastra/core/scores").MastraScorer<Record<"preprocessStepResult", {
    ratio: number;
    confidence: number;
    changes: number;
    lengthDiff: number;
}> & Record<"generateScoreStepResult", number>, ScorerRunInputForAgent, ScorerRunOutputForAgent>;
//# sourceMappingURL=index.d.ts.map