import type { LanguageModel } from '@mastra/core/llm';
import { MastraAgentJudge } from '../../judge/index.js';
export declare class ContextRelevancyJudge extends MastraAgentJudge {
    constructor(model: LanguageModel);
    evaluate(input: string, actualOutput: string, retrievalContext: string[]): Promise<{
        verdict: string;
        reason: string;
    }[]>;
    getReason(args: {
        score: number;
        input: string;
        irrelevancies: string[];
        relevantStatements: string[];
    }): Promise<string>;
}
//# sourceMappingURL=metricJudge.d.ts.map