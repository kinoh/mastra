import type { LanguageModel } from '@mastra/core/llm';
import { MastraAgentJudge } from '../../judge/index.js';
export declare class PromptAlignmentJudge extends MastraAgentJudge {
    constructor(model: LanguageModel);
    evaluate(input: string, actualOutput: string, instructions: string[]): Promise<{
        verdict: string;
        reason: string;
    }[]>;
    getReason(args: {
        input: string;
        output: string;
        score: number;
        verdicts: {
            verdict: string;
            reason: string;
        }[];
        scale: number;
    }): Promise<string>;
}
//# sourceMappingURL=metricJudge.d.ts.map