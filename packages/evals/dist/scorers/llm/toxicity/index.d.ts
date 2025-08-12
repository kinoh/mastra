import type { LanguageModel } from '@mastra/core/llm';
import type { ScorerRunInputForAgent, ScorerRunOutputForAgent } from '@mastra/core/scores';
export interface ToxicityMetricOptions {
    scale?: number;
}
export declare function createToxicityScorer({ model, options }: {
    model: LanguageModel;
    options?: ToxicityMetricOptions;
}): import("@mastra/core/scores").MastraScorer<Record<"analyzeStepResult", {
    verdicts: {
        verdict: string;
        reason: string;
    }[];
}> & Record<"generateScoreStepResult", number> & Record<"generateReasonStepResult", string>, ScorerRunInputForAgent, ScorerRunOutputForAgent>;
//# sourceMappingURL=index.d.ts.map