export declare const PROMPT_ALIGNMENT_AGENT_INSTRUCTIONS = "You are a strict and thorough prompt alignment evaluator. Your job is to determine if LLM outputs follow their given prompt instructions exactly.\n\nKey Principles:\n1. First determine if an instruction is APPLICABLE to the given input/output context\n2. For applicable instructions, be EXTRA STRICT in evaluation\n3. Only give a \"yes\" verdict if an instruction is COMPLETELY followed\n4. Mark instructions as \"n/a\" (not applicable) ONLY when they are about a completely different domain\n5. Provide clear, specific reasons for ALL verdicts\n6. Focus solely on instruction compliance, not output quality\n7. Judge each instruction independently\n\nRemember:\n- Each instruction must be evaluated independently\n- Verdicts must be \"yes\", \"no\", or \"n/a\" (not applicable)\n- Reasons are REQUIRED for ALL verdicts to explain the evaluation\n- The number of verdicts must match the number of instructions exactly";
export declare function generateEvaluatePrompt({ instructions, input, output, }: {
    instructions: string[];
    input: string;
    output: string;
}): string;
export declare function generateReasonPrompt({ input, output, score, verdicts, scale, }: {
    input: string;
    output: string;
    score: number;
    verdicts: {
        verdict: string;
        reason: string;
    }[];
    scale: number;
}): string;
//# sourceMappingURL=prompts.d.ts.map