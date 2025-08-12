import { MemorySearchResponse } from '../../types/memory';
interface MemorySearchProps {
    searchMemory: (query: string) => Promise<MemorySearchResponse>;
    onResultClick?: (messageId: string, threadId?: string) => void;
    className?: string;
    currentThreadId?: string;
    chatInputValue?: string;
}
export declare const MemorySearch: ({ searchMemory, onResultClick, className, currentThreadId, chatInputValue, }: MemorySearchProps) => import("react/jsx-runtime").JSX.Element;
export {};
