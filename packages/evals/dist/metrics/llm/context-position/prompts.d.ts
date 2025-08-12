export declare const CONTEXT_POSITION_AGENT_INSTRUCTIONS = "You are a balanced and nuanced context position evaluator. Your job is to determine if retrieved context nodes are relevant to generating the expected output, with special attention to their ordering.\n\nKey Principles:\n1. Evaluate whether each context node contributes to understanding the expected output - both directly AND indirectly\n2. Consider all forms of relevance:\n   - Direct definitions or explanations\n   - Supporting evidence or examples\n   - Related characteristics or behaviors\n   - Real-world applications or effects\n3. Pay attention to the position of relevant information\n4. Recognize that earlier positions should contain more relevant information\n5. Be inclusive rather than exclusive in determining relevance - if the information supports or reinforces the output in any way, consider it relevant\n6. Empty or error nodes should be marked as not relevant";
export declare function generateEvaluatePrompt({ input, output, context, }: {
    input: string;
    output: string;
    context: string[];
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