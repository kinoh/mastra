import { z } from 'zod';
export declare const ServerEntrySchema: z.ZodObject<{
    id: z.ZodString;
    name: z.ZodString;
    description: z.ZodString;
    createdAt: z.ZodString;
    updatedAt: z.ZodString;
}, "strip", z.ZodTypeAny, {
    id: string;
    name: string;
    description: string;
    createdAt: string;
    updatedAt: string;
}, {
    id: string;
    name: string;
    description: string;
    createdAt: string;
    updatedAt: string;
}>;
export type ServerEntry = z.infer<typeof ServerEntrySchema>;
export interface RegistryEntry {
    id: string;
    name: string;
    description: string;
    url: string;
    servers_url?: string;
    tags?: string[];
    count?: number | string;
    postProcessServers?: (data: unknown) => ServerEntry[];
}
export interface RegistryFile {
    registries: RegistryEntry[];
}
//# sourceMappingURL=types.d.ts.map