import type { WorkflowRun, WorkflowRuns } from '@mastra/core/storage';
import { WorkflowsStorage } from '@mastra/core/storage';
import type { WorkflowRunState } from '@mastra/core/workflows';
import type { StoreOperationsD1 } from '../operations/index.js';
export declare class WorkflowsStorageD1 extends WorkflowsStorage {
    private operations;
    constructor({ operations }: {
        operations: StoreOperationsD1;
    });
    persistWorkflowSnapshot({ workflowName, runId, snapshot, }: {
        workflowName: string;
        runId: string;
        snapshot: WorkflowRunState;
    }): Promise<void>;
    loadWorkflowSnapshot(params: {
        workflowName: string;
        runId: string;
    }): Promise<WorkflowRunState | null>;
    private parseWorkflowRun;
    getWorkflowRuns({ workflowName, fromDate, toDate, limit, offset, resourceId, }?: {
        workflowName?: string;
        fromDate?: Date;
        toDate?: Date;
        limit?: number;
        offset?: number;
        resourceId?: string;
    }): Promise<WorkflowRuns>;
    getWorkflowRunById({ runId, workflowName, }: {
        runId: string;
        workflowName?: string;
    }): Promise<WorkflowRun | null>;
}
//# sourceMappingURL=index.d.ts.map