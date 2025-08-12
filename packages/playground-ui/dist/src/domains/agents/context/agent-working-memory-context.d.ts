import { ReactNode } from '../../../../node_modules/@types/react';
type AgentWorkingMemoryContextType = {
    threadExists: boolean;
    workingMemoryData: string | null;
    workingMemorySource: 'thread' | 'resource';
    isLoading: boolean;
    isUpdating: boolean;
    updateWorkingMemory: (newMemory: string) => Promise<void>;
    refetch: () => Promise<void>;
};
export declare const WorkingMemoryContext: import('../../../../node_modules/@types/react').Context<AgentWorkingMemoryContextType>;
export interface AgentWorkingMemoryProviderProps {
    children: ReactNode;
    agentId: string;
    threadId: string;
    resourceId: string;
}
export declare function WorkingMemoryProvider({ agentId, threadId, resourceId, children }: AgentWorkingMemoryProviderProps): import("react/jsx-runtime").JSX.Element;
export declare function useWorkingMemory(): AgentWorkingMemoryContextType;
export {};
