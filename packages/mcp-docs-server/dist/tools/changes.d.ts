import { z } from 'zod';
export declare const changesInputSchema: z.ZodObject<{
    package: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    package?: string | undefined;
}, {
    package?: string | undefined;
}>;
export type ChangesInput = z.infer<typeof changesInputSchema>;
export declare const changesTool: {
    name: string;
    description: string;
    parameters: z.ZodObject<{
        package: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        package?: string | undefined;
    }, {
        package?: string | undefined;
    }>;
    execute: (args: ChangesInput) => Promise<string>;
};
//# sourceMappingURL=changes.d.ts.map