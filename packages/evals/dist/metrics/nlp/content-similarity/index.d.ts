import { Metric } from '@mastra/core/eval';
import type { MetricResult } from '@mastra/core/eval';
interface ContentSimilarityResult extends MetricResult {
    info: {
        similarity: number;
    };
}
interface ContentSimilarityOptions {
    ignoreCase?: boolean;
    ignoreWhitespace?: boolean;
}
export declare class ContentSimilarityMetric extends Metric {
    private options;
    constructor(options?: ContentSimilarityOptions);
    measure(input: string, output: string): Promise<ContentSimilarityResult>;
}
export {};
//# sourceMappingURL=index.d.ts.map