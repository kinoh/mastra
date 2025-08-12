import { Message } from '../../../types';
export declare const VNextNetworkChat: ({ networkId, networkName, threadId, initialMessages, memory, refreshThreadList, }: {
    networkId: string;
    networkName: string;
    threadId: string;
    initialMessages?: Message[];
    memory?: boolean;
    refreshThreadList?: () => void;
}) => import("react/jsx-runtime").JSX.Element;
