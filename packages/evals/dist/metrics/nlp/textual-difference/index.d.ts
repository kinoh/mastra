import { Metric } from '@mastra/core/eval';
import type { MetricResult } from '@mastra/core/eval';
interface TextualDifferenceResult extends MetricResult {
    info: {
        ratio: number;
        changes: number;
        lengthDiff: number;
        confidence: number;
    };
}
export declare class TextualDifferenceMetric extends Metric {
    measure(input: string, output: string): Promise<TextualDifferenceResult>;
}
export {};
//# sourceMappingURL=index.d.ts.map