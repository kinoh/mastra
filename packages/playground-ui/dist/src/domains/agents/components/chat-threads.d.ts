import { StorageThreadType } from '@mastra/core';
export interface ChatThreadsProps {
    computeNewThreadLink: () => string;
    computeThreadLink: (threadId: string) => string;
    threads: StorageThreadType[];
    isLoading: boolean;
    threadId: string;
    onDelete: (threadId: string) => void;
}
export declare const ChatThreads: ({ computeNewThreadLink, computeThreadLink, threads, isLoading, threadId, onDelete, }: ChatThreadsProps) => import("react/jsx-runtime").JSX.Element;
