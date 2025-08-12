import { Metric } from '@mastra/core/eval';
import type { LanguageModel } from '@mastra/core/llm';
import type { MetricResultWithReason } from '../types.js';
export interface AnswerRelevancyMetricOptions {
    uncertaintyWeight?: number;
    scale?: number;
}
export declare class AnswerRelevancyMetric extends Metric {
    private judge;
    private uncertaintyWeight;
    private scale;
    constructor(model: LanguageModel, { uncertaintyWeight, scale }?: AnswerRelevancyMetricOptions);
    measure(input: string, output: string): Promise<MetricResultWithReason>;
    private calculateScore;
}
//# sourceMappingURL=index.d.ts.map