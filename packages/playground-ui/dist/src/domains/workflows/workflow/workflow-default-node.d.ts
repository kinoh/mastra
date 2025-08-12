import { NodeProps, Node } from '@xyflow/react';
import { WorkflowSendEventFormProps } from './workflow-run-event-form';
export type DefaultNode = Node<{
    label: string;
    description?: string;
    withoutTopHandle?: boolean;
    withoutBottomHandle?: boolean;
    mapConfig?: string;
    event?: string;
    duration?: number;
    date?: Date;
}, 'default-node'>;
export interface WorkflowDefaultNodeProps {
    onShowTrace?: ({ runId, stepName }: {
        runId: string;
        stepName: string;
    }) => void;
    onSendEvent?: WorkflowSendEventFormProps['onSendEvent'];
    parentWorkflowName?: string;
}
export declare function WorkflowDefaultNode({ data, onShowTrace, parentWorkflowName, onSendEvent, }: NodeProps<DefaultNode> & WorkflowDefaultNodeProps): import("react/jsx-runtime").JSX.Element;
