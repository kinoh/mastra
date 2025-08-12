import { SerializedStepFlowEntry } from '@mastra/core/workflows';
import { WorkflowSendEventFormProps } from './workflow-run-event-form';
export interface WorkflowNestedGraphProps {
    stepGraph: SerializedStepFlowEntry[];
    open: boolean;
    workflowName: string;
    onShowTrace?: ({ runId, stepName }: {
        runId: string;
        stepName: string;
    }) => void;
    onSendEvent?: WorkflowSendEventFormProps['onSendEvent'];
}
export declare function WorkflowNestedGraph({ stepGraph, open, workflowName, onShowTrace, onSendEvent, }: WorkflowNestedGraphProps): import("react/jsx-runtime").JSX.Element;
