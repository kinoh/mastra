import { Metric } from '@mastra/core/eval';
import type { LanguageModel } from '@mastra/core/llm';
import type { MetricResultWithReason } from '../types.js';
export interface PromptAlignmentMetricOptions {
    scale?: number;
    instructions: string[];
}
export interface PromptAlignmentScore {
    score: number;
    totalInstructions: number;
    applicableInstructions: number;
    followedInstructions: number;
    naInstructions: number;
}
export interface PromptAlignmentMetricResult extends MetricResultWithReason {
    info: MetricResultWithReason['info'] & {
        scoreDetails: {
            totalInstructions: number;
            applicableInstructions: number;
            followedInstructions: number;
            naInstructions: number;
        };
    };
}
export declare class PromptAlignmentMetric extends Metric {
    private instructions;
    private judge;
    private scale;
    constructor(model: LanguageModel, { instructions, scale }: PromptAlignmentMetricOptions);
    measure(input: string, output: string): Promise<PromptAlignmentMetricResult>;
    private calculateScore;
}
//# sourceMappingURL=index.d.ts.map