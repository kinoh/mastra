import { ExtendedLegacyWorkflowRunResult } from '../../../hooks/use-workflows';
import { WorkflowRunState } from '@mastra/core';
import { WorkflowWatchResult } from '@mastra/client-js';
type WorkflowRunContextType = {
    legacyResult: ExtendedLegacyWorkflowRunResult | null;
    setLegacyResult: React.Dispatch<React.SetStateAction<any>>;
    result: WorkflowWatchResult | null;
    setResult: React.Dispatch<React.SetStateAction<any>>;
    payload: any;
    setPayload: React.Dispatch<React.SetStateAction<any>>;
    clearData: () => void;
    snapshot?: WorkflowRunState;
};
export declare const WorkflowRunContext: import('../../../../node_modules/@types/react').Context<WorkflowRunContextType>;
export declare function WorkflowRunProvider({ children, snapshot, }: {
    children: React.ReactNode;
    snapshot?: WorkflowRunState;
}): import("react/jsx-runtime").JSX.Element;
export {};
