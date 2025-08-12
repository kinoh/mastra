import { GetWorkflowResponse } from '@mastra/client-js';
import { WorkflowSendEventFormProps } from './workflow-run-event-form';
export interface WorkflowGraphProps {
    workflowId: string;
    isLoading?: boolean;
    workflow?: GetWorkflowResponse;
    onShowTrace?: ({ runId, stepName }: {
        runId: string;
        stepName: string;
    }) => void;
    onSendEvent?: WorkflowSendEventFormProps['onSendEvent'];
}
export declare function WorkflowGraph({ workflowId, onShowTrace, workflow, isLoading, onSendEvent }: WorkflowGraphProps): import("react/jsx-runtime").JSX.Element;
