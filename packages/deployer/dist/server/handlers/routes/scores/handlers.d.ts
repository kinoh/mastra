import type { Context } from 'hono';
export declare function getScorersHandler(c: Context): Promise<Response>;
export declare function getScorerHandler(c: Context): Promise<Response & import("hono").TypedResponse<{
    scorer: {
        config: {
            name: string;
            description: string;
            judge?: {
                model: {
                    readonly specificationVersion: "v1";
                    readonly provider: string;
                    readonly modelId: string;
                    readonly defaultObjectGenerationMode: "tool" | "json" | undefined;
                    readonly supportsImageUrls?: boolean | undefined;
                    readonly supportsStructuredOutputs?: boolean | undefined;
                    supportsUrl?: {} | undefined;
                    doGenerate: {};
                    doStream: {};
                };
                instructions: string;
            } | undefined;
        };
        readonly name: string;
        readonly description: string;
        readonly judge: {
            model: {
                readonly specificationVersion: "v1";
                readonly provider: string;
                readonly modelId: string;
                readonly defaultObjectGenerationMode: "tool" | "json" | undefined;
                readonly supportsImageUrls?: boolean | undefined;
                readonly supportsStructuredOutputs?: boolean | undefined;
                supportsUrl?: {} | undefined;
                doGenerate: {};
                doStream: {};
            };
            instructions: string;
        } | undefined;
        preprocess: {};
        analyze: {};
        generateScore: {};
        generateReason: {};
        run: {};
    };
    sampling?: {
        type: "none";
    } | {
        type: "ratio";
        rate: number;
    } | undefined;
    agentIds: string[];
    workflowIds: string[];
} | null, import("hono/utils/http-status").ContentfulStatusCode, "json">>;
export declare function getScoresByRunIdHandler(c: Context): Promise<Response>;
export declare function getScoresByScorerIdHandler(c: Context): Promise<Response>;
export declare function getScoresByEntityIdHandler(c: Context): Promise<Response>;
export declare function saveScoreHandler(c: Context): Promise<Response>;
//# sourceMappingURL=handlers.d.ts.map