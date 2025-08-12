import type { ScorerRunInputForAgent, ScorerRunOutputForAgent } from '@mastra/core/scores';
interface ContentSimilarityOptions {
    ignoreCase?: boolean;
    ignoreWhitespace?: boolean;
}
export declare function createContentSimilarityScorer({ ignoreCase, ignoreWhitespace }?: ContentSimilarityOptions): import("@mastra/core/scores").MastraScorer<Record<"preprocessStepResult", {
    processedInput: string;
    processedOutput: string;
}> & Record<"generateScoreStepResult", number>, ScorerRunInputForAgent, ScorerRunOutputForAgent>;
export {};
//# sourceMappingURL=index.d.ts.map