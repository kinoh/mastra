import type { LanguageModel } from '@mastra/core/llm';
import { MastraAgentJudge } from '../../judge/index.js';
export declare class ToxicityJudge extends MastraAgentJudge {
    constructor(model: LanguageModel);
    evaluate(input: string, actualOutput: string): Promise<{
        verdict: string;
        reason: string;
    }[]>;
    getReason(args: {
        score: number;
        toxics: string[];
    }): Promise<string>;
}
//# sourceMappingURL=metricJudge.d.ts.map