import type { LanguageModel } from '@mastra/core/llm';
import { MastraAgentJudge } from '../../judge/index.js';
export declare class BiasJudge extends MastraAgentJudge {
    constructor(model: LanguageModel);
    evaluate(input: string, actualOutput: string): Promise<{
        verdict: string;
        reason: string;
    }[]>;
    getReason(args: {
        score: number;
        biases: string[];
    }): Promise<string>;
}
//# sourceMappingURL=metricJudge.d.ts.map