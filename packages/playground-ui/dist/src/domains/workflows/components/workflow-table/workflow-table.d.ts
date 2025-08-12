import { GetLegacyWorkflowResponse, GetWorkflowResponse } from '@mastra/client-js';
export interface WorkflowTableProps {
    workflows?: Record<string, GetWorkflowResponse>;
    legacyWorkflows?: Record<string, GetLegacyWorkflowResponse>;
    isLoading: boolean;
    computeLink: (agentId: string) => string;
}
export declare function WorkflowTable({ workflows, legacyWorkflows, isLoading, computeLink }: WorkflowTableProps): import("react/jsx-runtime").JSX.Element;
export declare const WorkflowTableSkeleton: () => import("react/jsx-runtime").JSX.Element;
export declare const EmptyWorkflowsTable: () => import("react/jsx-runtime").JSX.Element;
