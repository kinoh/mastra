import { GetAgentResponse, GetToolResponse, GetWorkflowResponse } from '@mastra/client-js';
import { ReactNode } from '../../../../../node_modules/@types/react';
export interface AgentMetadataProps {
    agent: GetAgentResponse;
    promptSlot: ReactNode;
    hasMemoryEnabled: boolean;
    computeToolLink: (tool: GetToolResponse) => string;
    computeWorkflowLink: (workflow: GetWorkflowResponse) => string;
}
export declare const AgentMetadata: ({ agent, promptSlot, hasMemoryEnabled, computeToolLink, computeWorkflowLink, }: AgentMetadataProps) => import("react/jsx-runtime").JSX.Element;
export interface AgentMetadataToolListProps {
    tools: GetToolResponse[];
    computeToolLink: (tool: GetToolResponse) => string;
}
export declare const AgentMetadataToolList: ({ tools, computeToolLink }: AgentMetadataToolListProps) => import("react/jsx-runtime").JSX.Element;
export declare const AgentMetadataScorerList: ({ entityId }: {
    entityId: string;
}) => import("react/jsx-runtime").JSX.Element;
export interface AgentMetadataWorkflowListProps {
    workflows: GetWorkflowResponse[];
    computeWorkflowLink: (workflow: GetWorkflowResponse) => string;
}
export declare const AgentMetadataWorkflowList: ({ workflows, computeWorkflowLink }: AgentMetadataWorkflowListProps) => import("react/jsx-runtime").JSX.Element;
