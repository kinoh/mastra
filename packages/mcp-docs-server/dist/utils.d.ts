import z from 'zod';
export declare function fromRepoRoot(relative: string): string;
export declare function fromPackageRoot(relative: string): string;
export declare const log: {
    (...data: any[]): void;
    (message?: any, ...optionalParams: any[]): void;
};
export declare function getMatchingPaths(path: string, queryKeywords: string[], baseDir: string): Promise<string>;
export declare const blogPostSchema: z.ZodObject<{
    slug: z.ZodString;
    content: z.ZodString;
    metadata: z.ZodObject<{
        title: z.ZodString;
        publishedAt: z.ZodString;
        summary: z.ZodString;
        image: z.ZodOptional<z.ZodString>;
        author: z.ZodOptional<z.ZodString>;
        draft: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
        categories: z.ZodUnion<[z.ZodArray<z.ZodString, "many">, z.ZodString]>;
    }, "strip", z.ZodTypeAny, {
        title: string;
        publishedAt: string;
        summary: string;
        draft: boolean;
        categories: string | string[];
        image?: string | undefined;
        author?: string | undefined;
    }, {
        title: string;
        publishedAt: string;
        summary: string;
        categories: string | string[];
        image?: string | undefined;
        author?: string | undefined;
        draft?: boolean | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    content: string;
    slug: string;
    metadata: {
        title: string;
        publishedAt: string;
        summary: string;
        draft: boolean;
        categories: string | string[];
        image?: string | undefined;
        author?: string | undefined;
    };
}, {
    content: string;
    slug: string;
    metadata: {
        title: string;
        publishedAt: string;
        summary: string;
        categories: string | string[];
        image?: string | undefined;
        author?: string | undefined;
        draft?: boolean | undefined;
    };
}>;
//# sourceMappingURL=utils.d.ts.map