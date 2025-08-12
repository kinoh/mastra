import type { LanguageModel } from '@mastra/core/llm';
import { MastraAgentJudge } from '../../judge/index.js';
export declare class FaithfulnessJudge extends MastraAgentJudge {
    constructor(model: LanguageModel);
    evaluate(output: string, context: string[]): Promise<{
        claim: string;
        verdict: string;
        reason: string;
    }[]>;
    getReason(args: {
        input: string;
        output: string;
        context: string[];
        score: number;
        scale: number;
        verdicts: {
            verdict: string;
            reason: string;
        }[];
    }): Promise<string>;
}
//# sourceMappingURL=metricJudge.d.ts.map