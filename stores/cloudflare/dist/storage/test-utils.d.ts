import type { WorkflowRunState } from '@mastra/core';
export declare const createSampleTrace: (name: string, scope?: string, attributes?: Record<string, string>) => {
    id: string;
    parentSpanId: string;
    traceId: string;
    name: string;
    scope: string | undefined;
    kind: string;
    status: string;
    events: string;
    links: string;
    attributes: string | undefined;
    startTime: string;
    endTime: string;
    other: string;
    createdAt: string;
};
export declare const createSampleWorkflowSnapshot: (threadId: string, status: string, createdAt?: Date) => {
    snapshot: WorkflowRunState;
    runId: string;
    stepId: string;
};
export declare const retryUntil: <T>(fn: () => Promise<T>, condition: (result: T) => boolean, timeout?: number, // REST API needs longer timeout due to higher latency
interval?: number) => Promise<T>;
//# sourceMappingURL=test-utils.d.ts.map