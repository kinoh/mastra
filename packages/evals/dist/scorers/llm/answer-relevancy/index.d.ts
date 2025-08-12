import type { MastraLanguageModel } from '@mastra/core/agent';
import type { ScorerRunInputForAgent, ScorerRunOutputForAgent } from '@mastra/core/scores';
export declare const DEFAULT_OPTIONS: Record<'uncertaintyWeight' | 'scale', number>;
export declare const ANSWER_RELEVANCY_AGENT_INSTRUCTIONS = "\n    You are a balanced and nuanced answer relevancy evaluator. Your job is to determine if LLM outputs are relevant to the input, including handling partially relevant or uncertain cases.\n\n    Key Principles:\n    1. Evaluate whether the output addresses what the input is asking for\n    2. Consider both direct answers and related context\n    3. Prioritize relevance to the input over correctness\n    4. Recognize that responses can be partially relevant\n    5. Empty inputs or error messages should always be marked as \"no\"\n    6. Responses that discuss the type of information being asked show partial relevance\n";
export declare function createAnswerRelevancyScorer({ model, options, }: {
    model: MastraLanguageModel;
    options?: Record<'uncertaintyWeight' | 'scale', number>;
}): import("@mastra/core/scores").MastraScorer<Record<"preprocessStepResult", {
    statements: string[];
}> & Record<"analyzeStepResult", {
    results: {
        result: string;
        reason: string;
    }[];
}> & Record<"generateScoreStepResult", number> & Record<"generateReasonStepResult", string>, ScorerRunInputForAgent, ScorerRunOutputForAgent>;
//# sourceMappingURL=index.d.ts.map