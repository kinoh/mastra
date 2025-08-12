import type { Ai } from '@cloudflare/workers-types';
import { MastraVoice } from '@mastra/core/voice';
interface CloudflareListenOptions {
    apiKey?: string;
    model?: '@cf/openai/whisper-tiny-en' | '@cf/openai/whisper' | '@cf/openai/whisper-large-v3-turbo';
    account_id?: string;
}
export declare class CloudflareVoice extends MastraVoice {
    private apiToken?;
    private client;
    private binding?;
    constructor({ listeningModel, binding, }?: {
        listeningModel?: CloudflareListenOptions;
        binding?: Ai;
    });
    /**
     * Checks if listening capabilities are enabled.
     *
     * @returns {Promise<{ enabled: boolean }>}
     */
    getListener(): Promise<{
        enabled: boolean;
    }>;
    listen(audioStream: NodeJS.ReadableStream, options?: CloudflareListenOptions): Promise<string>;
    speak(): Promise<NodeJS.ReadableStream>;
    getSpeakers(): Promise<Array<{
        voiceId: string;
        [key: string]: any;
    }>>;
}
export {};
//# sourceMappingURL=index.d.ts.map