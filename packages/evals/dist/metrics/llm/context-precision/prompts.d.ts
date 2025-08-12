export declare const CONTEXT_PRECISION_AGENT_INSTRUCTIONS = "You are a balanced and nuanced context precision evaluator. Your job is to determine if retrieved context nodes are relevant to generating the expected output.\n\nKey Principles:\n1. Evaluate whether each context node was useful in generating the expected output\n2. Consider all forms of relevance:\n   - Direct definitions or explanations\n   - Supporting evidence or examples\n   - Related characteristics or behaviors\n   - Real-world applications or effects\n3. Prioritize usefulness over completeness\n4. Recognize that some nodes may be partially relevant\n5. Empty or error nodes should be marked as not relevant";
export declare function generateEvaluatePrompt({ input, output, context, }: {
    input: string;
    output: string;
    context: string[];
}): string;
export declare function generateReasonPrompt({ input, output, verdicts, score, scale, }: {
    input: string;
    output: string;
    verdicts: Array<{
        verdict: string;
        reason: string;
    }>;
    score: number;
    scale: number;
}): string;
//# sourceMappingURL=prompts.d.ts.map