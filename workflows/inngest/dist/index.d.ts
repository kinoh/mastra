import type { ReadableStream } from 'node:stream/web';
import type { Agent, Mastra, ToolExecutionContext, WorkflowRun, WorkflowRuns } from '@mastra/core';
import { RuntimeContext } from '@mastra/core/di';
import { Tool } from '@mastra/core/tools';
import { Workflow, Run, DefaultExecutionEngine } from '@mastra/core/workflows';
import type { ExecuteFunction, ExecutionContext, ExecutionEngine, ExecutionGraph, Step, WorkflowConfig, StepFlowEntry, StepResult, WorkflowResult, SerializedStepFlowEntry, Emitter, WatchEvent, StreamEvent, ChunkType } from '@mastra/core/workflows';
import type { Span } from '@opentelemetry/api';
import type { Inngest, BaseContext } from 'inngest';
import { serve as inngestServe } from 'inngest/hono';
import { z } from 'zod';
export type InngestEngineType = {
    step: any;
};
export declare function serve({ mastra, inngest }: {
    mastra: Mastra;
    inngest: Inngest;
}): ReturnType<typeof inngestServe>;
export declare class InngestRun<TEngineType = InngestEngineType, TSteps extends Step<string, any, any>[] = Step<string, any, any>[], TInput extends z.ZodType<any> = z.ZodType<any>, TOutput extends z.ZodType<any> = z.ZodType<any>> extends Run<TEngineType, TSteps, TInput, TOutput> {
    #private;
    private inngest;
    serializedStepGraph: SerializedStepFlowEntry[];
    constructor(params: {
        workflowId: string;
        runId: string;
        executionEngine: ExecutionEngine;
        executionGraph: ExecutionGraph;
        serializedStepGraph: SerializedStepFlowEntry[];
        mastra?: Mastra;
        retryConfig?: {
            attempts?: number;
            delay?: number;
        };
        cleanup?: () => void;
    }, inngest: Inngest);
    getRuns(eventId: string): Promise<any>;
    getRunOutput(eventId: string): Promise<any>;
    sendEvent(event: string, data: any): Promise<void>;
    cancel(): Promise<void>;
    start({ inputData, }: {
        inputData?: z.infer<TInput>;
        runtimeContext?: RuntimeContext;
    }): Promise<WorkflowResult<TOutput, TSteps>>;
    resume<TResumeSchema extends z.ZodType<any>>(params: {
        resumeData?: z.infer<TResumeSchema>;
        step: Step<string, any, any, TResumeSchema, any> | [...Step<string, any, any, any, any>[], Step<string, any, any, TResumeSchema, any>] | string | string[];
        runtimeContext?: RuntimeContext;
    }): Promise<WorkflowResult<TOutput, TSteps>>;
    _resume<TResumeSchema extends z.ZodType<any>>(params: {
        resumeData?: z.infer<TResumeSchema>;
        step: Step<string, any, any, TResumeSchema, any> | [...Step<string, any, any, any, any>[], Step<string, any, any, TResumeSchema, any>] | string | string[];
        runtimeContext?: RuntimeContext;
    }): Promise<WorkflowResult<TOutput, TSteps>>;
    watch(cb: (event: WatchEvent) => void, type?: 'watch' | 'watch-v2'): () => void;
    stream({ inputData, runtimeContext }?: {
        inputData?: z.infer<TInput>;
        runtimeContext?: RuntimeContext;
    }): {
        stream: ReadableStream<StreamEvent>;
        getWorkflowState: () => Promise<WorkflowResult<TOutput, TSteps>>;
    };
}
export declare class InngestWorkflow<TEngineType = InngestEngineType, TSteps extends Step<string, any, any>[] = Step<string, any, any>[], TWorkflowId extends string = string, TInput extends z.ZodType<any> = z.ZodType<any>, TOutput extends z.ZodType<any> = z.ZodType<any>, TPrevSchema extends z.ZodType<any> = TInput> extends Workflow<TEngineType, TSteps, TWorkflowId, TInput, TOutput, TPrevSchema> {
    #private;
    inngest: Inngest;
    private function;
    constructor(params: WorkflowConfig<TWorkflowId, TInput, TOutput, TSteps>, inngest: Inngest);
    getWorkflowRuns(args?: {
        fromDate?: Date;
        toDate?: Date;
        limit?: number;
        offset?: number;
        resourceId?: string;
    }): Promise<WorkflowRuns>;
    getWorkflowRunById(runId: string): Promise<WorkflowRun | null>;
    getWorkflowRunExecutionResult(runId: string): Promise<WatchEvent['payload']['workflowState'] | null>;
    __registerMastra(mastra: Mastra): void;
    createRun(options?: {
        runId?: string;
    }): Run<TEngineType, TSteps, TInput, TOutput>;
    createRunAsync(options?: {
        runId?: string;
    }): Promise<Run<TEngineType, TSteps, TInput, TOutput>>;
    getFunction(): import("inngest").InngestFunction<Omit<import("inngest").InngestFunction.Options<Inngest<import("inngest").ClientOptions>, import("inngest").InngestMiddleware.Stack, import("inngest").InngestFunction.Trigger<string>[] | [{
        cron: string;
    } & Partial<Record<"event" | "if", never>>] | [{
        event: string;
        if?: string;
    } & Partial<Record<"cron", never>>], import("inngest").Handler.Any>, "triggers">, import("inngest").Handler.Any, import("inngest").Handler.Any, Inngest<import("inngest").ClientOptions>, import("inngest").InngestMiddleware.Stack, import("inngest").InngestFunction.Trigger<string>[] | [{
        cron: string;
    } & Partial<Record<"event" | "if", never>>] | [{
        event: string;
        if?: string;
    } & Partial<Record<"cron", never>>]>;
    getNestedFunctions(steps: StepFlowEntry[]): ReturnType<Inngest['createFunction']>[];
    getFunctions(): import("inngest").InngestFunction<Omit<import("inngest").InngestFunction.Options<Inngest<import("inngest").ClientOptions>, import("inngest").InngestMiddleware.Stack, import("inngest").InngestFunction.Trigger<string>[] | [{
        cron: string;
    } & Partial<Record<"event" | "if", never>>] | [{
        event: string;
        if?: string;
    } & Partial<Record<"cron", never>>], import("inngest").Handler.Any>, "triggers">, import("inngest").Handler.Any, import("inngest").Handler.Any, Inngest<import("inngest").ClientOptions>, import("inngest").InngestMiddleware.Stack, import("inngest").InngestFunction.Trigger<string>[] | [{
        cron: string;
    } & Partial<Record<"event" | "if", never>>] | [{
        event: string;
        if?: string;
    } & Partial<Record<"cron", never>>]>[];
}
export declare function createStep<TStepId extends string, TStepInput extends z.ZodType<any>, TStepOutput extends z.ZodType<any>, TResumeSchema extends z.ZodType<any>, TSuspendSchema extends z.ZodType<any>>(params: {
    id: TStepId;
    description?: string;
    inputSchema: TStepInput;
    outputSchema: TStepOutput;
    resumeSchema?: TResumeSchema;
    suspendSchema?: TSuspendSchema;
    execute: ExecuteFunction<z.infer<TStepInput>, z.infer<TStepOutput>, z.infer<TResumeSchema>, z.infer<TSuspendSchema>, InngestEngineType>;
}): Step<TStepId, TStepInput, TStepOutput, TResumeSchema, TSuspendSchema, InngestEngineType>;
export declare function createStep<TStepId extends string, TStepInput extends z.ZodObject<{
    prompt: z.ZodString;
}>, TStepOutput extends z.ZodObject<{
    text: z.ZodString;
}>, TResumeSchema extends z.ZodType<any>, TSuspendSchema extends z.ZodType<any>>(agent: Agent<TStepId, any, any>): Step<TStepId, TStepInput, TStepOutput, TResumeSchema, TSuspendSchema, InngestEngineType>;
export declare function createStep<TSchemaIn extends z.ZodType<any>, TSchemaOut extends z.ZodType<any>, TContext extends ToolExecutionContext<TSchemaIn>>(tool: Tool<TSchemaIn, TSchemaOut, TContext> & {
    inputSchema: TSchemaIn;
    outputSchema: TSchemaOut;
    execute: (context: TContext) => Promise<any>;
}): Step<string, TSchemaIn, TSchemaOut, z.ZodType<any>, z.ZodType<any>, InngestEngineType>;
export declare function init(inngest: Inngest): {
    createWorkflow<TWorkflowId extends string = string, TInput extends z.ZodType<any> = z.ZodType<any, z.ZodTypeDef, any>, TOutput extends z.ZodType<any> = z.ZodType<any, z.ZodTypeDef, any>, TSteps extends Step<string, any, any, any, any, InngestEngineType>[] = Step<string, any, any, any, any, InngestEngineType>[]>(params: WorkflowConfig<TWorkflowId, TInput, TOutput, TSteps>): InngestWorkflow<InngestEngineType, TSteps, TWorkflowId, TInput, TOutput, TInput>;
    createStep: typeof createStep;
    cloneStep<TStepId extends string>(step: Step<string, any, any, any, any, InngestEngineType>, opts: {
        id: TStepId;
    }): Step<TStepId, any, any, any, any, InngestEngineType>;
    cloneWorkflow<TWorkflowId extends string = string, TInput extends z.ZodType<any> = z.ZodType<any, z.ZodTypeDef, any>, TOutput extends z.ZodType<any> = z.ZodType<any, z.ZodTypeDef, any>, TSteps extends Step<string, any, any, any, any, InngestEngineType>[] = Step<string, any, any, any, any, InngestEngineType>[], TPrevSchema extends z.ZodType<any> = TInput>(workflow: Workflow<InngestEngineType, TSteps, string, TInput, TOutput, TPrevSchema>, opts: {
        id: TWorkflowId;
    }): Workflow<InngestEngineType, TSteps, TWorkflowId, TInput, TOutput, TPrevSchema>;
};
export declare class InngestExecutionEngine extends DefaultExecutionEngine {
    private inngestStep;
    private inngestAttempts;
    constructor(mastra: Mastra, inngestStep: BaseContext<Inngest>['step'], inngestAttempts?: number);
    execute<TInput, TOutput>(params: {
        workflowId: string;
        runId: string;
        graph: ExecutionGraph;
        serializedStepGraph: SerializedStepFlowEntry[];
        input?: TInput;
        resume?: {
            steps: string[];
            stepResults: Record<string, StepResult<any, any, any, any>>;
            resumePayload: any;
            resumePath: number[];
        };
        emitter: Emitter;
        retryConfig?: {
            attempts?: number;
            delay?: number;
        };
        runtimeContext: RuntimeContext;
        abortController: AbortController;
    }): Promise<TOutput>;
    protected fmtReturnValue<TOutput>(executionSpan: Span | undefined, emitter: Emitter, stepResults: Record<string, StepResult<any, any, any, any>>, lastOutput: StepResult<any, any, any, any>, error?: Error | string): Promise<TOutput>;
    superExecuteStep({ workflowId, runId, step, stepResults, executionContext, resume, prevOutput, emitter, abortController, runtimeContext, writableStream, }: {
        workflowId: string;
        runId: string;
        step: Step<string, any, any>;
        stepResults: Record<string, StepResult<any, any, any, any>>;
        executionContext: ExecutionContext;
        resume?: {
            steps: string[];
            resumePayload: any;
        };
        prevOutput: any;
        emitter: Emitter;
        abortController: AbortController;
        runtimeContext: RuntimeContext;
        writableStream?: WritableStream<ChunkType>;
    }): Promise<StepResult<any, any, any, any>>;
    executeSleep({ workflowId, runId, entry, prevOutput, stepResults, emitter, abortController, runtimeContext, writableStream, }: {
        workflowId: string;
        runId: string;
        serializedStepGraph: SerializedStepFlowEntry[];
        entry: {
            type: 'sleep';
            id: string;
            duration?: number;
            fn?: ExecuteFunction<any, any, any, any, InngestEngineType>;
        };
        prevStep: StepFlowEntry;
        prevOutput: any;
        stepResults: Record<string, StepResult<any, any, any, any>>;
        resume?: {
            steps: string[];
            stepResults: Record<string, StepResult<any, any, any, any>>;
            resumePayload: any;
            resumePath: number[];
        };
        executionContext: ExecutionContext;
        emitter: Emitter;
        abortController: AbortController;
        runtimeContext: RuntimeContext;
        writableStream?: WritableStream<ChunkType>;
    }): Promise<void>;
    executeSleepUntil({ workflowId, runId, entry, prevOutput, stepResults, emitter, abortController, runtimeContext, writableStream, }: {
        workflowId: string;
        runId: string;
        serializedStepGraph: SerializedStepFlowEntry[];
        entry: {
            type: 'sleepUntil';
            id: string;
            date?: Date;
            fn?: ExecuteFunction<any, any, any, any, InngestEngineType>;
        };
        prevStep: StepFlowEntry;
        prevOutput: any;
        stepResults: Record<string, StepResult<any, any, any, any>>;
        resume?: {
            steps: string[];
            stepResults: Record<string, StepResult<any, any, any, any>>;
            resumePayload: any;
            resumePath: number[];
        };
        executionContext: ExecutionContext;
        emitter: Emitter;
        abortController: AbortController;
        runtimeContext: RuntimeContext;
        writableStream?: WritableStream<ChunkType>;
    }): Promise<void>;
    executeWaitForEvent({ event, timeout }: {
        event: string;
        timeout?: number;
    }): Promise<any>;
    executeStep({ step, stepResults, executionContext, resume, prevOutput, emitter, abortController, runtimeContext, writableStream, }: {
        step: Step<string, any, any>;
        stepResults: Record<string, StepResult<any, any, any, any>>;
        executionContext: ExecutionContext;
        resume?: {
            steps: string[];
            resumePayload: any;
            runId?: string;
        };
        prevOutput: any;
        emitter: Emitter;
        abortController: AbortController;
        runtimeContext: RuntimeContext;
        writableStream?: WritableStream<ChunkType>;
    }): Promise<StepResult<any, any, any, any>>;
    persistStepUpdate({ workflowId, runId, stepResults, executionContext, serializedStepGraph, workflowStatus, result, error, }: {
        workflowId: string;
        runId: string;
        stepResults: Record<string, StepResult<any, any, any, any>>;
        serializedStepGraph: SerializedStepFlowEntry[];
        executionContext: ExecutionContext;
        workflowStatus: 'success' | 'failed' | 'suspended' | 'running';
        result?: Record<string, any>;
        error?: string | Error;
        runtimeContext: RuntimeContext;
    }): Promise<void>;
    executeConditional({ workflowId, runId, entry, prevOutput, prevStep, stepResults, serializedStepGraph, resume, executionContext, emitter, abortController, runtimeContext, writableStream, }: {
        workflowId: string;
        runId: string;
        entry: {
            type: 'conditional';
            steps: StepFlowEntry[];
            conditions: ExecuteFunction<any, any, any, any, InngestEngineType>[];
        };
        prevStep: StepFlowEntry;
        serializedStepGraph: SerializedStepFlowEntry[];
        prevOutput: any;
        stepResults: Record<string, StepResult<any, any, any, any>>;
        resume?: {
            steps: string[];
            stepResults: Record<string, StepResult<any, any, any, any>>;
            resumePayload: any;
            resumePath: number[];
        };
        executionContext: ExecutionContext;
        emitter: Emitter;
        abortController: AbortController;
        runtimeContext: RuntimeContext;
        writableStream?: WritableStream<ChunkType>;
    }): Promise<StepResult<any, any, any, any>>;
}
//# sourceMappingURL=index.d.ts.map