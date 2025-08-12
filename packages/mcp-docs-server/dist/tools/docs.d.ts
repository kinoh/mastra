import { z } from 'zod';
export declare const docsInputSchema: z.ZodObject<{
    paths: z.ZodArray<z.ZodString, "many">;
    queryKeywords: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
}, "strip", z.ZodTypeAny, {
    paths: string[];
    queryKeywords?: string[] | undefined;
}, {
    paths: string[];
    queryKeywords?: string[] | undefined;
}>;
export type DocsInput = z.infer<typeof docsInputSchema>;
export declare const docsTool: {
    name: string;
    description: string;
    parameters: z.ZodObject<{
        paths: z.ZodArray<z.ZodString, "many">;
        queryKeywords: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    }, "strip", z.ZodTypeAny, {
        paths: string[];
        queryKeywords?: string[] | undefined;
    }, {
        paths: string[];
        queryKeywords?: string[] | undefined;
    }>;
    execute: (args: DocsInput) => Promise<string>;
};
//# sourceMappingURL=docs.d.ts.map