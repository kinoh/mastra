import { default as React, ReactNode } from '../../node_modules/@types/react';
import { ThreadMessageLike } from '@assistant-ui/react';
export declare const MessagesProvider: ({ children }: {
    children: ReactNode;
}) => import("react/jsx-runtime").JSX.Element;
export declare const useMessages: () => {
    messages: ThreadMessageLike[];
    setMessages: React.Dispatch<React.SetStateAction<ThreadMessageLike[]>>;
    appendToLastMessage: (partial: string) => void;
};
