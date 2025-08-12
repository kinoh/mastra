import { ZodSchema } from 'zod';
export interface WorkflowInputDataProps {
    schema: ZodSchema;
    defaultValues?: any;
    isSubmitLoading: boolean;
    submitButtonLabel: string;
    onSubmit: (data: any) => void;
}
export declare const WorkflowInputData: ({ schema, defaultValues, isSubmitLoading, submitButtonLabel, onSubmit, }: WorkflowInputDataProps) => import("react/jsx-runtime").JSX.Element;
