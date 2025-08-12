import { ReactNode } from '../../node_modules/@types/react';
import { ChatProps, ModelSettings } from '../types';
export declare function MastraNetworkRuntimeProvider({ children, agentId, initialMessages, memory, threadId, modelSettings, }: Readonly<{
    children: ReactNode;
}> & Omit<ChatProps, 'settings'> & {
    modelSettings: ModelSettings;
}): import("react/jsx-runtime").JSX.Element;
