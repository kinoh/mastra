import { CompositeAttachmentAdapter, SpeechSynthesisAdapter } from '@assistant-ui/react';
export declare const useAdapters: (agentId: string) => {
    isReady: boolean;
    adapters: {
        attachments: CompositeAttachmentAdapter;
        speech: SpeechSynthesisAdapter | undefined;
    };
};
