import { ReactNode } from '../../node_modules/@types/react';
import { ChatProps } from '../types';
type VNextMastraNetworkRuntimeProviderProps = Omit<ChatProps, 'agentId' | 'agentName' | 'modelSettings'> & {
    networkId: string;
};
export declare function VNextMastraNetworkRuntimeProvider({ children, networkId, memory, threadId, refreshThreadList, initialMessages, runtimeContext, }: Readonly<{
    children: ReactNode;
}> & VNextMastraNetworkRuntimeProviderProps): import("react/jsx-runtime").JSX.Element;
export {};
