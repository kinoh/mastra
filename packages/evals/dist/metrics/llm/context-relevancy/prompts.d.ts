export declare const CONTEXT_RELEVANCY_AGENT_INSTRUCTIONS = "You are a balanced and nuanced context relevancy evaluator. Your job is to determine if retrieved context nodes are overall relevant to given input.\n\nKey Principles:\n1. Evaluate whether each context node was useful in generating the given input\n2. Consider all forms of relevance:\n   - Direct definitions or explanations\n   - Supporting evidence or examples\n   - Related characteristics or behaviors\n   - Real-world applications or effects\n3. Prioritize usefulness over completeness\n4. Recognize that some nodes may be partially relevant\n5. Empty or error nodes should be marked as not relevant";
export declare function generateEvaluatePrompt({ input, output, context, }: {
    input: string;
    output: string;
    context: string[];
}): string;
export declare function generateReasonPrompt({ score, input, irrelevancies, relevantStatements, }: {
    score: number;
    input: string;
    irrelevancies: string[];
    relevantStatements: string[];
}): string;
//# sourceMappingURL=prompts.d.ts.map