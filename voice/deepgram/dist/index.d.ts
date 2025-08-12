import { MastraVoice } from '@mastra/core/voice';
import type { DeepgramVoiceId, DeepgramModel } from './voices.js';
interface DeepgramVoiceConfig {
    name?: DeepgramModel;
    apiKey?: string;
    properties?: Record<string, any>;
    language?: string;
}
export declare class DeepgramVoice extends MastraVoice {
    private speechClient?;
    private listeningClient?;
    constructor({ speechModel, listeningModel, speaker, }?: {
        speechModel?: DeepgramVoiceConfig;
        listeningModel?: DeepgramVoiceConfig;
        speaker?: DeepgramVoiceId;
    });
    getSpeakers(): Promise<{
        voiceId: "asteria-en" | "luna-en" | "stella-en" | "athena-en" | "hera-en" | "orion-en" | "arcas-en" | "perseus-en" | "angus-en" | "orpheus-en" | "helios-en" | "zeus-en";
    }[]>;
    speak(input: string | NodeJS.ReadableStream, options?: {
        speaker?: string;
        [key: string]: any;
    }): Promise<NodeJS.ReadableStream>;
    /**
     * Checks if listening capabilities are enabled.
     *
     * @returns {Promise<{ enabled: boolean }>}
     */
    getListener(): Promise<{
        enabled: boolean;
    }>;
    listen(audioStream: NodeJS.ReadableStream, options?: {
        [key: string]: any;
    }): Promise<string>;
}
export type { DeepgramVoiceConfig, DeepgramVoiceId, DeepgramModel };
//# sourceMappingURL=index.d.ts.map