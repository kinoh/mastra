import { RuntimeContext } from '@mastra/core/runtime-context';
import type { ScorerRunInputForAgent, ScorerRunOutputForAgent, ScoringInput } from '@mastra/core/scores';
import type { ToolInvocation, UIMessage } from 'ai';
export declare const roundToTwoDecimals: (num: number) => number;
export declare function isCloserTo(value: number, target1: number, target2: number): boolean;
export type TestCase = {
    input: string;
    output: string;
    expectedResult: {
        score: number;
        reason?: string;
    };
};
export type TestCaseWithContext = TestCase & {
    context: string[];
};
export declare const createTestRun: (input: string, output: string, context?: string[]) => ScoringInput;
export declare const getUserMessageFromRunInput: (input?: ScorerRunInputForAgent) => string | undefined;
export declare const getAssistantMessageFromRunOutput: (output?: ScorerRunOutputForAgent) => string | undefined;
export declare const createToolInvocation: ({ toolCallId, toolName, args, result, state, }: {
    toolCallId: string;
    toolName: string;
    args: Record<string, any>;
    result: Record<string, any>;
    state?: ToolInvocation["state"];
}) => {
    toolCallId: string;
    toolName: string;
    args: Record<string, any>;
    result: Record<string, any>;
    state: string;
};
export declare const createUIMessage: ({ content, role, id, toolInvocations, }: {
    id: string;
    role: "user" | "assistant" | "system";
    content: string;
    toolInvocations?: Array<{
        toolCallId: string;
        toolName: string;
        args: Record<string, any>;
        result: Record<string, any>;
        state: any;
    }>;
}) => UIMessage;
export declare const createAgentTestRun: ({ inputMessages, output, rememberedMessages, systemMessages, taggedSystemMessages, runtimeContext, runId, }: {
    inputMessages?: ScorerRunInputForAgent["inputMessages"];
    output: ScorerRunOutputForAgent;
    rememberedMessages?: ScorerRunInputForAgent["rememberedMessages"];
    systemMessages?: ScorerRunInputForAgent["systemMessages"];
    taggedSystemMessages?: ScorerRunInputForAgent["taggedSystemMessages"];
    runtimeContext?: RuntimeContext;
    runId?: string;
}) => {
    input: ScorerRunInputForAgent;
    output: ScorerRunOutputForAgent;
    runtimeContext: RuntimeContext;
    runId: string;
};
//# sourceMappingURL=utils.d.ts.map