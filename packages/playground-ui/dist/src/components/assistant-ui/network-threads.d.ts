import { ToolCallContentPartComponent } from '@assistant-ui/react';
export interface ThreadProps {
    ToolFallback?: ToolCallContentPartComponent;
    networkName?: string;
    hasMemory?: boolean;
}
export declare const NetworkThread: ({ ToolFallback, networkName, hasMemory }: ThreadProps) => import("react/jsx-runtime").JSX.Element;
export interface ThreadWelcomeProps {
    networkName?: string;
}
