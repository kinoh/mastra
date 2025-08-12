import { GetWorkflowResponse, WorkflowWatchResult } from '@mastra/client-js';
interface WorkflowTriggerProps {
    workflowId: string;
    setRunId?: (runId: string) => void;
    workflow?: GetWorkflowResponse;
    isLoading?: boolean;
    createWorkflowRun: ({ workflowId, prevRunId }: {
        workflowId: string;
        prevRunId?: string;
    }) => Promise<{
        runId: string;
    }>;
    isStreamingWorkflow: boolean;
    streamWorkflow: ({ workflowId, runId, inputData, runtimeContext, }: {
        workflowId: string;
        runId: string;
        inputData: Record<string, unknown>;
        runtimeContext: Record<string, unknown>;
    }) => Promise<void>;
    resumeWorkflow: ({ workflowId, step, runId, resumeData, runtimeContext, }: {
        workflowId: string;
        step: string | string[];
        runId: string;
        resumeData: Record<string, unknown>;
        runtimeContext: Record<string, unknown>;
    }) => Promise<{
        message: string;
    }>;
    streamResult: WorkflowWatchResult | null;
    isResumingWorkflow: boolean;
    isCancellingWorkflowRun: boolean;
    cancelWorkflowRun: ({ workflowId, runId }: {
        workflowId: string;
        runId: string;
    }) => Promise<{
        message: string;
    }>;
}
export declare function WorkflowTrigger({ workflowId, setRunId, workflow, isLoading, createWorkflowRun, resumeWorkflow, streamWorkflow, isStreamingWorkflow, streamResult, isResumingWorkflow, isCancellingWorkflowRun, cancelWorkflowRun, }: WorkflowTriggerProps): import("react/jsx-runtime").JSX.Element | null;
export {};
