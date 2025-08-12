import type { LanguageModel } from '@mastra/core/llm';
import type { ScorerRunInputForAgent, ScorerRunOutputForAgent } from '@mastra/core/scores';
export interface HallucinationMetricOptions {
    scale?: number;
    context: string[];
}
export declare function createHallucinationScorer({ model, options, }: {
    model: LanguageModel;
    options?: HallucinationMetricOptions;
}): import("@mastra/core/scores").MastraScorer<Record<"preprocessStepResult", {
    claims: string[];
}> & Record<"analyzeStepResult", {
    verdicts: {
        verdict: string;
        reason: string;
        statement: string;
    }[];
}> & Record<"generateScoreStepResult", number> & Record<"generateReasonStepResult", string>, ScorerRunInputForAgent, ScorerRunOutputForAgent>;
//# sourceMappingURL=index.d.ts.map