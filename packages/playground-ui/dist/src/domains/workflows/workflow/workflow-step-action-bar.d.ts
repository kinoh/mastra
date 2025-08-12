import { WorkflowSendEventFormProps } from './workflow-run-event-form';
export interface WorkflowStepActionBarProps {
    input?: any;
    output?: any;
    resumeData?: any;
    error?: any;
    stepName: string;
    mapConfig?: string;
    event?: string;
    onShowTrace?: () => void;
    onShowNestedGraph?: () => void;
    onSendEvent?: WorkflowSendEventFormProps['onSendEvent'];
    runId?: string;
    status?: 'running' | 'success' | 'failed' | 'suspended' | 'waiting';
}
export declare const WorkflowStepActionBar: ({ input, output, resumeData, error, mapConfig, stepName, event, onShowTrace, onShowNestedGraph, onSendEvent, runId, status, }: WorkflowStepActionBarProps) => import("react/jsx-runtime").JSX.Element;
