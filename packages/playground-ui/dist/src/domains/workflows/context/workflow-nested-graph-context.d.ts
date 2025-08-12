import { SerializedStepFlowEntry } from '@mastra/core/workflows';
import { WorkflowSendEventFormProps } from '../workflow/workflow-run-event-form';
type WorkflowNestedGraphContextType = {
    showNestedGraph: ({ label, stepGraph, fullStep, }: {
        label: string;
        stepGraph: SerializedStepFlowEntry[];
        fullStep: string;
    }) => void;
    closeNestedGraph: () => void;
};
export declare const WorkflowNestedGraphContext: import('../../../../node_modules/@types/react').Context<WorkflowNestedGraphContextType>;
export declare function WorkflowNestedGraphProvider({ children, onShowTrace, onSendEvent, }: {
    children: React.ReactNode;
    onShowTrace?: ({ runId, stepName }: {
        runId: string;
        stepName: string;
    }) => void;
    onSendEvent?: WorkflowSendEventFormProps['onSendEvent'];
}): import("react/jsx-runtime").JSX.Element;
export {};
