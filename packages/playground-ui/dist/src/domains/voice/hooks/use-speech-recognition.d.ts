export interface SpeechRecognitionState {
    isListening: boolean;
    transcript: string;
    error: string | null;
}
export interface UseSpeechRecognitionArgs {
    language?: string;
    agentId?: string;
}
type BrowserSpeechRecognition = {
    start: () => void;
    stop: () => void;
    isListening: boolean;
    transcript: string;
};
export declare const useSpeechRecognition: ({ language, agentId, }: UseSpeechRecognitionArgs) => BrowserSpeechRecognition;
export {};
