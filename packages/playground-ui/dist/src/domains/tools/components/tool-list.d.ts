import { GetAgentResponse, GetToolResponse } from '@mastra/client-js';
export interface ToolListProps {
    isLoading: boolean;
    tools: Record<string, GetToolResponse>;
    agents: Record<string, GetAgentResponse>;
    computeLink: (toolId: string, agentId?: string) => string;
    computeAgentLink: (toolId: string, agentId: string) => string;
}
export declare const ToolList: ({ tools, agents, isLoading, computeLink, computeAgentLink }: ToolListProps) => import("react/jsx-runtime").JSX.Element;
export declare const ToolListSkeleton: () => import("react/jsx-runtime").JSX.Element;
export declare const ToolListEmpty: () => import("react/jsx-runtime").JSX.Element;
