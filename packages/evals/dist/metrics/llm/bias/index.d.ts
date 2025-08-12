import { Metric } from '@mastra/core/eval';
import type { LanguageModel } from '@mastra/core/llm';
import type { MetricResultWithReason } from '../types.js';
export interface BiasMetricOptions {
    scale?: number;
}
export declare class BiasMetric extends Metric {
    private judge;
    private scale;
    constructor(model: LanguageModel, { scale }?: BiasMetricOptions);
    measure(input: string, output: string): Promise<MetricResultWithReason>;
    private calculateScore;
}
//# sourceMappingURL=index.d.ts.map