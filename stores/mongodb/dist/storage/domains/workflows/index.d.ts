import { WorkflowsStorage } from '@mastra/core/storage';
import type { WorkflowRun, WorkflowRuns } from '@mastra/core/storage';
import type { WorkflowRunState } from '@mastra/core/workflows';
import type { StoreOperationsMongoDB } from '../operations/index.js';
export declare class WorkflowsStorageMongoDB extends WorkflowsStorage {
    private operations;
    constructor({ operations }: {
        operations: StoreOperationsMongoDB;
    });
    persistWorkflowSnapshot({ workflowName, runId, snapshot, }: {
        workflowName: string;
        runId: string;
        snapshot: WorkflowRunState;
    }): Promise<void>;
    loadWorkflowSnapshot({ workflowName, runId, }: {
        workflowName: string;
        runId: string;
    }): Promise<WorkflowRunState | null>;
    getWorkflowRuns(args?: {
        workflowName?: string;
        fromDate?: Date;
        toDate?: Date;
        limit?: number;
        offset?: number;
        resourceId?: string;
    }): Promise<WorkflowRuns>;
    getWorkflowRunById(args: {
        runId: string;
        workflowName?: string;
    }): Promise<WorkflowRun | null>;
    private parseWorkflowRun;
}
//# sourceMappingURL=index.d.ts.map