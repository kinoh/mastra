import type { Context } from 'hono';
export declare function getAgentsHandler(c: Context): Promise<Response & import("hono").TypedResponse<{
    [x: string]: {
        name: any;
        tools: any;
        workflows: {};
        provider: string;
        instructions: string;
        modelId: string;
        defaultGenerateOptions: any;
        defaultStreamOptions: any;
    };
}, import("hono/utils/http-status").ContentfulStatusCode, "json">>;
export declare function getAgentByIdHandler(c: Context): Promise<Response & import("hono").TypedResponse<{
    name: any;
    instructions: string;
    tools: any;
    workflows: {};
    provider: string;
    modelId: string;
    defaultGenerateOptions: any;
    defaultStreamOptions: any;
}, import("hono/utils/http-status").ContentfulStatusCode, "json">>;
export declare function getEvalsByAgentIdHandler(c: Context): Promise<Response & import("hono").TypedResponse<{
    id: string;
    name: any;
    instructions: string;
    evals: {
        input: string;
        output: string;
        result: {
            score: number;
            info?: {
                [x: string]: any;
            } | undefined;
        };
        agentName: string;
        createdAt: string;
        metricName: string;
        instructions: string;
        runId: string;
        globalRunId: string;
        testInfo?: {
            testName?: string | undefined;
            testPath?: string | undefined;
        } | undefined;
    }[];
}, import("hono/utils/http-status").ContentfulStatusCode, "json">>;
export declare function getLiveEvalsByAgentIdHandler(c: Context): Promise<Response & import("hono").TypedResponse<{
    id: string;
    name: any;
    instructions: string;
    evals: {
        input: string;
        output: string;
        result: {
            score: number;
            info?: {
                [x: string]: any;
            } | undefined;
        };
        agentName: string;
        createdAt: string;
        metricName: string;
        instructions: string;
        runId: string;
        globalRunId: string;
        testInfo?: {
            testName?: string | undefined;
            testPath?: string | undefined;
        } | undefined;
    }[];
}, import("hono/utils/http-status").ContentfulStatusCode, "json">>;
export declare function generateHandler(c: Context): Promise<Response>;
export declare function streamGenerateHandler(c: Context): Promise<Response | undefined>;
export declare function streamVNextGenerateHandler(c: Context): Promise<Response | undefined>;
export declare function setAgentInstructionsHandler(c: Context): Promise<Response>;
//# sourceMappingURL=handlers.d.ts.map