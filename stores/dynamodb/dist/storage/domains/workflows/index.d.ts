import { WorkflowsStorage } from '@mastra/core/storage';
import type { WorkflowRun, WorkflowRuns } from '@mastra/core/storage';
import type { WorkflowRunState } from '@mastra/core/workflows';
import type { Service } from 'electrodb';
export declare class WorkflowStorageDynamoDB extends WorkflowsStorage {
    private service;
    constructor({ service }: {
        service: Service<Record<string, any>>;
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
}
//# sourceMappingURL=index.d.ts.map