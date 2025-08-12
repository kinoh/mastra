/**
 * List of available Deepgram voice models for text-to-speech
 * Each voice is designed for specific use cases and languages
 * Format: {name}-{language} (e.g. asteria-en)
 */
export declare const DEEPGRAM_VOICES: readonly ["asteria-en", "luna-en", "stella-en", "athena-en", "hera-en", "orion-en", "arcas-en", "perseus-en", "angus-en", "orpheus-en", "helios-en", "zeus-en"];
export type DeepgramVoiceId = (typeof DEEPGRAM_VOICES)[number];
/**
 * List of available Deepgram models for text-to-speech and speech-to-text
 */
export declare const DEEPGRAM_MODELS: readonly ["aura", "whisper", "base", "enhanced", "nova", "nova-2", "nova-3"];
export type DeepgramModel = (typeof DEEPGRAM_MODELS)[number];
//# sourceMappingURL=voices.d.ts.map