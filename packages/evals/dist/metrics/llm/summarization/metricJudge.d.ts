import type { LanguageModel } from '@mastra/core/llm';
import { MastraAgentJudge } from '../../judge/index.js';
export declare class SummarizationJudge extends MastraAgentJudge {
    constructor(model: LanguageModel);
    evaluateAlignment(originalText: string, summary: string): Promise<{
        verdict: string;
        reason: string;
    }[]>;
    evaluateQuestionBasedCoverage(originalText: string, summary: string): Promise<{
        questions: string[];
        answers: string[];
    }>;
    evaluateCoverage(originalText: string, summary: string): Promise<{
        verdict: string;
        reason: string;
    }[]>;
    getReason(args: {
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
    }): Promise<string>;
}
//# sourceMappingURL=metricJudge.d.ts.map