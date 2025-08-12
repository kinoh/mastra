export declare const CONTEXT_RECALL_AGENT_INSTRUCTIONS = "You are a balanced and nuanced contextual recall evaluator. Your job is to determine if retrieved context nodes are aligning to the expected output.";
export declare function generateEvaluatePrompt({ input, output, context, }: {
    input: string;
    output: string;
    context: string[];
}): string;
export declare function generateReasonPrompt({ score, unsupportiveReasons, expectedOutput, supportiveReasons, }: {
    score: number;
    unsupportiveReasons: string[];
    expectedOutput: string;
    supportiveReasons: string[];
}): string;
//# sourceMappingURL=prompts.d.ts.map