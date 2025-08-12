import { Metric } from '@mastra/core/eval';
import type { MetricResult } from '@mastra/core/eval';
interface ToneConsitencyResult extends MetricResult {
    info: {
        responseSentiment: number;
        referenceSentiment: number;
        difference: number;
    } | {
        avgSentiment: number;
        sentimentVariance: number;
    };
}
export declare class ToneConsistencyMetric extends Metric {
    private sentiment;
    measure(input: string, output: string): Promise<ToneConsitencyResult>;
}
export {};
//# sourceMappingURL=index.d.ts.map