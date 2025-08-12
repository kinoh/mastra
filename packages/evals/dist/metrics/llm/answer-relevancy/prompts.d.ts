export declare const ANSWER_RELEVANCY_AGENT_INSTRUCTIONS = "You are a balanced and nuanced answer relevancy evaluator. Your job is to determine if LLM outputs are relevant to the input, including handling partially relevant or uncertain cases.\n\nKey Principles:\n1. Evaluate whether the output addresses what the input is asking for\n2. Consider both direct answers and related context\n3. Prioritize relevance to the input over correctness\n4. Recognize that responses can be partially relevant\n5. Empty inputs or error messages should always be marked as \"no\"\n6. Responses that discuss the type of information being asked show partial relevance";
export declare function generateEvaluationStatementsPrompt({ output }: {
    output: string;
}): string;
export declare function generateEvaluatePrompt({ input, statements }: {
    input: string;
    statements: string[];
}): string;
export declare function generateReasonPrompt({ score, verdicts, input, output, scale, }: {
    score: number;
    verdicts: {
        verdict: string;
        reason: string;
    }[];
    input: string;
    output: string;
    scale: number;
}): string;
//# sourceMappingURL=prompts.d.ts.map