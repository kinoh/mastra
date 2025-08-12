import type { LanguageModel } from '@mastra/core/llm';
import { MastraAgentJudge } from '../../judge/index.js';
export declare class ContextPositionJudge extends MastraAgentJudge {
    constructor(model: LanguageModel);
    evaluate(input: string, actualOutput: string, retrievalContext: string[]): Promise<{
        verdict: string;
        reason: string;
    }[]>;
    getReason(args: {
        input: string;
        output: string;
        score: number;
        scale: number;
        verdicts: {
            verdict: string;
            reason: string;
        }[];
    }): Promise<string>;
}
//# sourceMappingURL=metricJudge.d.ts.map