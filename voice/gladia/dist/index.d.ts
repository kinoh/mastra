import type { Readable } from 'stream';
import { MastraVoice } from '@mastra/core/voice';
interface GladiaConfig {
    apiKey: string;
}
interface GladiaListenOptions {
    diarization?: boolean;
    diarization_config?: {
        number_of_speakers?: number;
        min_speakers?: number;
        max_speakers?: number;
    };
    translation?: boolean;
    translation_config?: {
        model?: 'base' | 'enhanced';
        target_languages?: string[];
    };
    detect_language?: boolean;
    enable_code_switching?: boolean;
}
interface GladiaListenCallParams {
    mimeType: string;
    fileName: string;
    options?: GladiaListenOptions;
}
export declare class GladiaVoice extends MastraVoice {
    private apiKey;
    private baseUrl;
    constructor({ listeningModel }?: {
        listeningModel?: GladiaConfig;
    });
    speak(_input: string, _options?: Record<string, unknown>): Promise<any>;
    listen(input: Readable, { mimeType, fileName, options }: GladiaListenCallParams): Promise<string>;
}
export type { GladiaConfig, GladiaListenOptions };
export type { GladiaListenCallParams };
//# sourceMappingURL=index.d.ts.map