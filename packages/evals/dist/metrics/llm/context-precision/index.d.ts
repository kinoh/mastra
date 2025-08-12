import { Metric } from '@mastra/core/eval';
import type { LanguageModel } from '@mastra/core/llm';
import type { MetricResultWithReason } from '../types.js';
export interface ContextPrecisionMetricOptions {
    scale?: number;
    context: string[];
}
export declare class ContextPrecisionMetric extends Metric {
    private judge;
    private scale;
    private context;
    constructor(model: LanguageModel, { scale, context }: ContextPrecisionMetricOptions);
    measure(input: string, output: string): Promise<MetricResultWithReason>;
    private calculateScore;
}
//# sourceMappingURL=index.d.ts.map