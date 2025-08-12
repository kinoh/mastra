import { default as React, ReactNode } from '../../node_modules/@types/react';
type StateValue = {
    executionSteps: Array<string>;
    steps: Record<string, any>;
    runId?: string;
};
type State = Record<string, StateValue>;
type VNextNetworkChatContextType = {
    state: State;
    handleStep: (uuid: string, record: Record<string, any>) => void;
    setState: React.Dispatch<React.SetStateAction<State>>;
};
export declare const VNextNetworkChatProvider: ({ children }: {
    children: ReactNode;
}) => import("react/jsx-runtime").JSX.Element;
export declare const useVNextNetworkChat: () => VNextNetworkChatContextType;
export {};
