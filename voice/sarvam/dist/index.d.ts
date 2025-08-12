import { MastraVoice } from '@mastra/core/voice';
import type { SarvamTTSLanguage, SarvamSTTLanguage, SarvamSTTModel, SarvamTTSModel, SarvamVoiceId } from './voices.js';
interface SarvamVoiceConfig {
    apiKey?: string;
    model?: SarvamTTSModel;
    language?: SarvamTTSLanguage;
    properties?: {
        pitch?: number;
        pace?: number;
        loudness?: number;
        speech_sample_rate?: 8000 | 16000 | 22050;
        enable_preprocessing?: boolean;
        eng_interpolation_wt?: number;
    };
}
interface SarvamListenOptions {
    apiKey?: string;
    model?: SarvamSTTModel;
    languageCode?: SarvamSTTLanguage;
    filetype?: 'mp3' | 'wav';
}
export declare class SarvamVoice extends MastraVoice {
    private apiKey?;
    private model;
    private language;
    private properties;
    speaker: SarvamVoiceId;
    private baseUrl;
    constructor({ speechModel, speaker, listeningModel, }?: {
        speechModel?: SarvamVoiceConfig;
        speaker?: SarvamVoiceId;
        listeningModel?: SarvamListenOptions;
    });
    private makeRequest;
    private streamToString;
    speak(input: string | NodeJS.ReadableStream, options?: {
        speaker?: SarvamVoiceId;
    }): Promise<NodeJS.ReadableStream>;
    getSpeakers(): Promise<{
        voiceId: "meera" | "pavithra" | "maitreyi" | "arvind" | "amol" | "amartya" | "diya" | "neel" | "misha" | "vian" | "arjun" | "maya";
    }[]>;
    /**
     * Checks if listening capabilities are enabled.
     *
     * @returns {Promise<{ enabled: boolean }>}
     */
    getListener(): Promise<{
        enabled: boolean;
    }>;
    listen(input: NodeJS.ReadableStream, options?: SarvamListenOptions): Promise<string>;
}
export {};
//# sourceMappingURL=index.d.ts.map