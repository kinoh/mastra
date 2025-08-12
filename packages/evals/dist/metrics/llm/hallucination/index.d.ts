import { Metric } from '@mastra/core/eval';
import type { LanguageModel } from '@mastra/core/llm';
import type { MetricResultWithReason } from '../types.js';
export interface HallucinationMetricOptions {
    scale?: number;
    context: string[];
}
export declare class HallucinationMetric extends Metric {
    private judge;
    private scale;
    private context;
    constructor(model: LanguageModel, { scale, context }: HallucinationMetricOptions);
    measure(input: string, output: string): Promise<MetricResultWithReason>;
    private calculateScore;
}
//# sourceMappingURL=index.d.ts.map