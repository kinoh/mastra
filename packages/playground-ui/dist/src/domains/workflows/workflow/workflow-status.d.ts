export interface WorkflowStatusProps {
    stepId: string;
    status: string;
    result: Record<string, unknown>;
}
export declare const WorkflowStatus: ({ stepId, status, result }: WorkflowStatusProps) => import("react/jsx-runtime").JSX.Element;
