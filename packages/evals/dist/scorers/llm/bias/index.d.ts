import type { LanguageModel } from '@mastra/core/llm';
import type { ScorerRunInputForAgent, ScorerRunOutputForAgent } from '@mastra/core/scores';
export interface BiasMetricOptions {
    scale?: number;
}
export declare function createBiasScorer({ model, options }: {
    model: LanguageModel;
    options?: BiasMetricOptions;
}): import("@mastra/core/scores").MastraScorer<Record<"preprocessStepResult", {
    opinions: string[];
}> & Record<"analyzeStepResult", {
    results: {
        result: string;
        reason: string;
    }[];
}> & Record<"generateScoreStepResult", number> & Record<"generateReasonStepResult", string>, ScorerRunInputForAgent, ScorerRunOutputForAgent>;
//# sourceMappingURL=index.d.ts.map