import { WorkflowsStorage } from '@mastra/core/storage';
import type { WorkflowRun, WorkflowRuns } from '@mastra/core/storage';
import type { WorkflowRunState } from '@mastra/core/workflows';
import type { StoreOperationsCloudflare } from '../operations/index.js';
export declare class WorkflowsStorageCloudflare extends WorkflowsStorage {
    private operations;
    constructor({ operations }: {
        operations: StoreOperationsCloudflare;
    });
    private validateWorkflowParams;
    persistWorkflowSnapshot(params: {
        workflowName: string;
        runId: string;
        snapshot: WorkflowRunState;
    }): Promise<void>;
    loadWorkflowSnapshot(params: {
        workflowName: string;
        runId: string;
    }): Promise<WorkflowRunState | null>;
    private parseWorkflowRun;
    private buildWorkflowSnapshotPrefix;
    getWorkflowRuns({ workflowName, limit, offset, resourceId, fromDate, toDate, }?: {
        workflowName?: string;
        limit?: number;
        offset?: number;
        resourceId?: string;
        fromDate?: Date;
        toDate?: Date;
    }): Promise<WorkflowRuns>;
    getWorkflowRunById({ runId, workflowName, }: {
        runId: string;
        workflowName: string;
    }): Promise<WorkflowRun | null>;
}
//# sourceMappingURL=index.d.ts.map