import { Metric } from '@mastra/core/eval';
import type { LanguageModel } from '@mastra/core/llm';
import type { MetricResultWithReason } from '../types.js';
export interface SummarizationMetricOptions {
    scale?: number;
}
export declare class SummarizationMetric extends Metric {
    private judge;
    private scale;
    constructor(model: LanguageModel, { scale }?: SummarizationMetricOptions);
    measure(input: string, output: string): Promise<MetricResultWithReason & {
        info: {
            alignmentScore: number;
            coverageScore: number;
        };
    }>;
    private calculateScore;
}
//# sourceMappingURL=index.d.ts.map