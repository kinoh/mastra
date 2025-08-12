import { z } from 'zod';
export declare const listInputSchema: z.ZodObject<{
    id: z.ZodOptional<z.ZodString>;
    tag: z.ZodOptional<z.ZodString>;
    name: z.ZodOptional<z.ZodString>;
    detailed: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
}, "strip", z.ZodTypeAny, {
    detailed: boolean;
    id?: string | undefined;
    name?: string | undefined;
    tag?: string | undefined;
}, {
    id?: string | undefined;
    name?: string | undefined;
    tag?: string | undefined;
    detailed?: boolean | undefined;
}>;
export type ListToolInput = z.infer<typeof listInputSchema>;
export declare const listTool: {
    name: string;
    description: string;
    execute(input: ListToolInput): Promise<{
        content: {
            type: string;
            text: string;
        }[];
        isError?: undefined;
    } | {
        content: {
            type: string;
            text: string;
        }[];
        isError: boolean;
    }>;
};
//# sourceMappingURL=list.d.ts.map