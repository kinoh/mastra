import type { ToolsInput } from '@mastra/core/agent';
export type OpenAIExecuteFunction = (args: any) => Promise<any>;
type ToolDefinition = {
    type: 'function';
    name: string;
    description: string;
    parameters: {
        [key: string]: any;
    };
};
type TTools = ToolsInput;
export declare const transformTools: (tools?: TTools) => {
    openaiTool: ToolDefinition;
    execute: OpenAIExecuteFunction;
}[];
export declare const isReadableStream: (obj: unknown) => unknown;
export {};
//# sourceMappingURL=utils.d.ts.map