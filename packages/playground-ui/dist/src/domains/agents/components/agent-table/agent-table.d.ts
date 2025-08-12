import { GetAgentResponse } from '@mastra/client-js';
export interface AgentsTableProps {
    agents: Record<string, GetAgentResponse>;
    isLoading: boolean;
    computeLink: (agentId: string) => string;
}
export declare function AgentsTable({ agents, isLoading, computeLink }: AgentsTableProps): import("react/jsx-runtime").JSX.Element;
export declare const AgentsTableSkeleton: () => import("react/jsx-runtime").JSX.Element;
export declare const EmptyAgentsTable: () => import("react/jsx-runtime").JSX.Element;
