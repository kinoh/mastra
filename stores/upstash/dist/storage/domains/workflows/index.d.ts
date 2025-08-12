import type { WorkflowRun, WorkflowRuns, WorkflowRunState } from '@mastra/core';
import { WorkflowsStorage } from '@mastra/core/storage';
import type { Redis } from '@upstash/redis';
import type { StoreOperationsUpstash } from '../operations/index.js';
export declare class WorkflowsUpstash extends WorkflowsStorage {
    private client;
    private operations;
    constructor({ client, operations }: {
        client: Redis;
        operations: StoreOperationsUpstash;
    });
    persistWorkflowSnapshot(params: {
        namespace: string;
        workflowName: string;
        runId: string;
        snapshot: WorkflowRunState;
    }): Promise<void>;
    loadWorkflowSnapshot(params: {
        namespace: string;
        workflowName: string;
        runId: string;
    }): Promise<WorkflowRunState | null>;
    getWorkflowRunById({ runId, workflowName, }: {
        runId: string;
        workflowName?: string;
    }): Promise<WorkflowRun | null>;
    getWorkflowRuns({ workflowName, fromDate, toDate, limit, offset, resourceId, }: {
        workflowName?: string;
        fromDate?: Date;
        toDate?: Date;
        limit?: number;
        offset?: number;
        resourceId?: string;
    }): Promise<WorkflowRuns>;
}
//# sourceMappingURL=index.d.ts.map