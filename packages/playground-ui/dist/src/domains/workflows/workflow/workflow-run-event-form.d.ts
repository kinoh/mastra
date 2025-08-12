export type WorkflowSendEventFormProps = {
    event: string;
    runId: string;
    onSendEvent: (params: {
        event: string;
        data: unknown;
        runId: string;
    }) => Promise<{
        message: string;
    }>;
};
export declare const WorkflowRunEventForm: ({ event, runId, onSendEvent }: WorkflowSendEventFormProps) => import("react/jsx-runtime").JSX.Element;
