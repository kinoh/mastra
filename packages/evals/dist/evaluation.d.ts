import type { Metric } from '@mastra/core';
import type { Agent } from '@mastra/core/agent';
export declare function evaluate<T extends Agent>(agent: T, input: Parameters<T['generate']>[0], metric: Metric): Promise<import("@mastra/core").EvaluationResult>;
export declare const getCurrentTestInfo: () => Promise<{
    testName: any;
    testPath: any;
} | undefined>;
//# sourceMappingURL=evaluation.d.ts.map