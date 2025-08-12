import { z } from 'zod';
export declare const serversInputSchema: z.ZodObject<{
    registryId: z.ZodString;
    tag: z.ZodOptional<z.ZodString>;
    search: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    registryId: string;
    tag?: string | undefined;
    search?: string | undefined;
}, {
    registryId: string;
    tag?: string | undefined;
    search?: string | undefined;
}>;
export type ServersToolInput = z.infer<typeof serversInputSchema>;
export declare const serversTool: {
    name: string;
    description: string;
    execute(input: ServersToolInput): Promise<{
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
//# sourceMappingURL=servers.d.ts.map