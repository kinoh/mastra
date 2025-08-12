import type { LanguageModel } from '@mastra/core/llm';
import type { ScorerRunInputForAgent, ScorerRunOutputForAgent } from '@mastra/core/scores';
export interface FaithfulnessMetricOptions {
    scale?: number;
    context?: string[];
}
export declare function createFaithfulnessScorer({ model, options, }: {
    model: LanguageModel;
    options?: FaithfulnessMetricOptions;
}): import("@mastra/core/scores").MastraScorer<Record<"preprocessStepResult", string[]> & Record<"analyzeStepResult", {
    verdicts: {
        verdict: string;
        reason: string;
    }[];
}> & Record<"generateScoreStepResult", number> & Record<"generateReasonStepResult", string>, ScorerRunInputForAgent, ScorerRunOutputForAgent>;
//# sourceMappingURL=index.d.ts.map