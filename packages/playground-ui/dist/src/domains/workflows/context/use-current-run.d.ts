export type Step = {
    error?: any;
    startedAt: number;
    endedAt?: number;
    status: 'running' | 'success' | 'failed' | 'suspended' | 'waiting';
    output?: any;
    input?: any;
    resumeData?: any;
};
type UseCurrentRunReturnType = {
    steps: Record<string, Step>;
    isRunning: boolean;
    runId?: string;
};
export declare const useCurrentRun: () => UseCurrentRunReturnType;
export {};
