import { z } from 'zod';
export declare const blogInputSchema: z.ZodObject<{
    url: z.ZodString;
}, "strip", z.ZodTypeAny, {
    url: string;
}, {
    url: string;
}>;
export type BlogInput = z.infer<typeof blogInputSchema>;
export declare const blogTool: {
    name: string;
    description: string;
    parameters: z.ZodObject<{
        url: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        url: string;
    }, {
        url: string;
    }>;
    execute: (args: BlogInput) => Promise<string>;
};
//# sourceMappingURL=blog.d.ts.map