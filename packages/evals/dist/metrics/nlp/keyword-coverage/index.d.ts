import { Metric } from '@mastra/core/eval';
import type { MetricResult } from '@mastra/core/eval';
interface KeywordCoverageResult extends MetricResult {
    info: {
        totalKeywords: number;
        matchedKeywords: number;
    };
}
export declare class KeywordCoverageMetric extends Metric {
    measure(input: string, output: string): Promise<KeywordCoverageResult>;
}
export {};
//# sourceMappingURL=index.d.ts.map