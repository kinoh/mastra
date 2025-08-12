export declare const SUMMARIZATION_AGENT_INSTRUCTIONS = "\nYou are a strict and thorough summarization evaluator. Your job is to determine if LLM-generated summaries are factually correct and contain necessary details from the original text.\n\nKey Principles:\n1. Be EXTRA STRICT in evaluating factual correctness and coverage.\n2. Only give a \"yes\" verdict if a statement is COMPLETELY supported by the original text.\n3. Give \"no\" if the statement contradicts or deviates from the original text.\n4. Focus on both factual accuracy and coverage of key information.\n5. Exact details matter - approximations or generalizations count as deviations.\n";
export declare function generateAlignmentPrompt({ originalText, summaryClaims, }: {
    originalText: string;
    summaryClaims: string[];
}): string;
export declare function generateQuestionsPrompt({ originalText }: {
    originalText: string;
}): string;
export declare function generateAnswersPrompt({ originalText, summary, questions, }: {
    originalText: string;
    summary: string;
    questions: string[];
}): string;
export declare function generateReasonPrompt({ originalText, summary, alignmentScore, coverageScore, finalScore, alignmentVerdicts, coverageVerdicts, scale, }: {
    originalText: string;
    summary: string;
    alignmentScore: number;
    coverageScore: number;
    finalScore: number;
    alignmentVerdicts: {
        verdict: string;
        reason: string;
    }[];
    coverageVerdicts: {
        verdict: string;
        reason: string;
    }[];
    scale: number;
}): string;
//# sourceMappingURL=prompts.d.ts.map