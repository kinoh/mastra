import { Metric } from '@mastra/core/eval';
import type { LanguageModel } from '@mastra/core/llm';
import type { MetricResultWithReason } from '../types.js';
export interface ToxicityMetricOptions {
    scale?: number;
}
export declare class ToxicityMetric extends Metric {
    private judge;
    private scale;
    constructor(model: LanguageModel, { scale }?: ToxicityMetricOptions);
    measure(input: string, output: string): Promise<MetricResultWithReason>;
    private calculateScore;
}
//# sourceMappingURL=index.d.ts.map