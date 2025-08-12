import type { ScorerRunInputForAgent, ScorerRunOutputForAgent } from '@mastra/core/scores';
interface ToneScorerConfig {
    referenceTone?: string;
}
export declare function createToneScorer(config?: ToneScorerConfig): import("@mastra/core/scores").MastraScorer<Record<"preprocessStepResult", {
    score: number;
    responseSentiment: number;
    referenceSentiment: number;
    difference: number;
    avgSentiment?: undefined;
    sentimentVariance?: undefined;
} | {
    score: number;
    avgSentiment: number;
    sentimentVariance: number;
    responseSentiment?: undefined;
    referenceSentiment?: undefined;
    difference?: undefined;
}> & Record<"generateScoreStepResult", number>, ScorerRunInputForAgent, ScorerRunOutputForAgent>;
export {};
//# sourceMappingURL=index.d.ts.map