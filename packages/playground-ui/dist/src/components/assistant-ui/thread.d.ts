import { ToolCallContentPartComponent } from '@assistant-ui/react';
export interface ThreadProps {
    ToolFallback?: ToolCallContentPartComponent;
    agentName?: string;
    agentId?: string;
    hasMemory?: boolean;
    onInputChange?: (value: string) => void;
}
export declare const Thread: ({ ToolFallback, agentName, agentId, hasMemory, onInputChange }: ThreadProps) => import("react/jsx-runtime").JSX.Element;
export interface ThreadWelcomeProps {
    agentName?: string;
}
