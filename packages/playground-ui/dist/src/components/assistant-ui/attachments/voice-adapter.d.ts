import { SpeechSynthesisAdapter } from '@assistant-ui/react';
import { Agent } from '@mastra/core';
export declare class VoiceAttachmentAdapter implements SpeechSynthesisAdapter {
    private readonly agent;
    constructor(agent: Agent);
    speak(text: string): SpeechSynthesisAdapter.Utterance;
}
