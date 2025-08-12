import { NodeProps, Node } from '@xyflow/react';
import { SerializedStepFlowEntry } from '@mastra/core/workflows';
import { WorkflowSendEventFormProps } from './workflow-run-event-form';
export type NestedNode = Node<{
    label: string;
    description?: string;
    withoutTopHandle?: boolean;
    withoutBottomHandle?: boolean;
    stepGraph: SerializedStepFlowEntry[];
    mapConfig?: string;
    event?: string;
}, 'nested-node'>;
export interface WorkflowNestedNodeProps {
    onShowTrace?: ({ runId, stepName }: {
        runId: string;
        stepName: string;
    }) => void;
    onSendEvent?: WorkflowSendEventFormProps['onSendEvent'];
    parentWorkflowName?: string;
}
export declare function WorkflowNestedNode({ data, parentWorkflowName, onShowTrace, onSendEvent, }: NodeProps<NestedNode> & WorkflowNestedNodeProps): import("react/jsx-runtime").JSX.Element;
