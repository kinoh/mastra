import { z } from 'zod';
export declare const examplesInputSchema: z.ZodObject<{
    example: z.ZodOptional<z.ZodString>;
    queryKeywords: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
}, "strip", z.ZodTypeAny, {
    queryKeywords?: string[] | undefined;
    example?: string | undefined;
}, {
    queryKeywords?: string[] | undefined;
    example?: string | undefined;
}>;
export type ExamplesInput = z.infer<typeof examplesInputSchema>;
export declare const examplesTool: {
    name: string;
    description: string;
    parameters: z.ZodObject<{
        example: z.ZodOptional<z.ZodString>;
        queryKeywords: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    }, "strip", z.ZodTypeAny, {
        queryKeywords?: string[] | undefined;
        example?: string | undefined;
    }, {
        queryKeywords?: string[] | undefined;
        example?: string | undefined;
    }>;
    execute: (args: ExamplesInput) => Promise<string>;
};
//# sourceMappingURL=examples.d.ts.map