import { GetWorkflowResponse } from '@mastra/client-js';
import { WorkflowSendEventFormProps } from './workflow-run-event-form';
export interface WorkflowGraphInnerProps {
    workflow: {
        stepGraph: GetWorkflowResponse['stepGraph'];
    };
    onShowTrace?: ({ runId, stepName }: {
        runId: string;
        stepName: string;
    }) => void;
    onSendEvent?: WorkflowSendEventFormProps['onSendEvent'];
}
export declare function WorkflowGraphInner({ workflow, onShowTrace, onSendEvent }: WorkflowGraphInnerProps): import("react/jsx-runtime").JSX.Element;
