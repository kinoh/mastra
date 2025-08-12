import { Metric } from '@mastra/core/eval';
import type { MetricResult } from '@mastra/core/eval';
interface CompletenessMetricResult extends MetricResult {
    info: {
        inputElements: string[];
        outputElements: string[];
        missingElements: string[];
        elementCounts: {
            input: number;
            output: number;
        };
    };
}
export declare class CompletenessMetric extends Metric {
    measure(input: string, output: string): Promise<CompletenessMetricResult>;
    private extractElements;
    private normalizeString;
    private calculateCoverage;
}
export {};
//# sourceMappingURL=index.d.ts.map