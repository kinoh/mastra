export declare function useAgentWorkingMemory(agentId: string, threadId: string, resourceId: string): {
    threadExists: boolean;
    workingMemoryData: string | null;
    workingMemorySource: "resource" | "thread";
    workingMemoryFormat: "json" | "markdown";
    isLoading: boolean;
    isUpdating: boolean;
    refetch: () => Promise<void>;
    updateWorkingMemory: (newMemory: string) => Promise<void>;
};
