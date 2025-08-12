import { z } from 'zod';
export declare const crawlResponseSchema: z.ZodObject<{
    success: z.ZodOptional<z.ZodBoolean>;
    id: z.ZodOptional<z.ZodString>;
    url: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    url?: string | undefined;
    success?: boolean | undefined;
    id?: string | undefined;
}, {
    url?: string | undefined;
    success?: boolean | undefined;
    id?: string | undefined;
}>;
export declare const crawlStatusResponseObjSchema: z.ZodObject<{
    status: z.ZodOptional<z.ZodString>;
    total: z.ZodOptional<z.ZodNumber>;
    completed: z.ZodOptional<z.ZodNumber>;
    creditsUsed: z.ZodOptional<z.ZodNumber>;
    expiresAt: z.ZodOptional<z.ZodString>;
    next: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    data: z.ZodOptional<z.ZodArray<z.ZodObject<{
        markdown: z.ZodOptional<z.ZodString>;
        html: z.ZodNullable<z.ZodOptional<z.ZodString>>;
        rawHtml: z.ZodNullable<z.ZodOptional<z.ZodString>>;
        links: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        screenshot: z.ZodNullable<z.ZodOptional<z.ZodString>>;
        metadata: z.ZodOptional<z.ZodObject<{
            title: z.ZodOptional<z.ZodString>;
            description: z.ZodOptional<z.ZodString>;
            language: z.ZodNullable<z.ZodOptional<z.ZodString>>;
            sourceURL: z.ZodOptional<z.ZodString>;
            '<any other metadata> ': z.ZodOptional<z.ZodString>;
            statusCode: z.ZodOptional<z.ZodNumber>;
            error: z.ZodNullable<z.ZodOptional<z.ZodString>>;
        }, "strip", z.ZodTypeAny, {
            error?: string | null | undefined;
            title?: string | undefined;
            description?: string | undefined;
            language?: string | null | undefined;
            sourceURL?: string | undefined;
            '<any other metadata> '?: string | undefined;
            statusCode?: number | undefined;
        }, {
            error?: string | null | undefined;
            title?: string | undefined;
            description?: string | undefined;
            language?: string | null | undefined;
            sourceURL?: string | undefined;
            '<any other metadata> '?: string | undefined;
            statusCode?: number | undefined;
        }>>;
    }, "strip", z.ZodTypeAny, {
        markdown?: string | undefined;
        html?: string | null | undefined;
        rawHtml?: string | null | undefined;
        links?: string[] | undefined;
        screenshot?: string | null | undefined;
        metadata?: {
            error?: string | null | undefined;
            title?: string | undefined;
            description?: string | undefined;
            language?: string | null | undefined;
            sourceURL?: string | undefined;
            '<any other metadata> '?: string | undefined;
            statusCode?: number | undefined;
        } | undefined;
    }, {
        markdown?: string | undefined;
        html?: string | null | undefined;
        rawHtml?: string | null | undefined;
        links?: string[] | undefined;
        screenshot?: string | null | undefined;
        metadata?: {
            error?: string | null | undefined;
            title?: string | undefined;
            description?: string | undefined;
            language?: string | null | undefined;
            sourceURL?: string | undefined;
            '<any other metadata> '?: string | undefined;
            statusCode?: number | undefined;
        } | undefined;
    }>, "many">>;
}, "strip", z.ZodTypeAny, {
    status?: string | undefined;
    total?: number | undefined;
    completed?: number | undefined;
    creditsUsed?: number | undefined;
    expiresAt?: string | undefined;
    next?: string | null | undefined;
    data?: {
        markdown?: string | undefined;
        html?: string | null | undefined;
        rawHtml?: string | null | undefined;
        links?: string[] | undefined;
        screenshot?: string | null | undefined;
        metadata?: {
            error?: string | null | undefined;
            title?: string | undefined;
            description?: string | undefined;
            language?: string | null | undefined;
            sourceURL?: string | undefined;
            '<any other metadata> '?: string | undefined;
            statusCode?: number | undefined;
        } | undefined;
    }[] | undefined;
}, {
    status?: string | undefined;
    total?: number | undefined;
    completed?: number | undefined;
    creditsUsed?: number | undefined;
    expiresAt?: string | undefined;
    next?: string | null | undefined;
    data?: {
        markdown?: string | undefined;
        html?: string | null | undefined;
        rawHtml?: string | null | undefined;
        links?: string[] | undefined;
        screenshot?: string | null | undefined;
        metadata?: {
            error?: string | null | undefined;
            title?: string | undefined;
            description?: string | undefined;
            language?: string | null | undefined;
            sourceURL?: string | undefined;
            '<any other metadata> '?: string | undefined;
            statusCode?: number | undefined;
        } | undefined;
    }[] | undefined;
}>;
export declare const mapResponseSchema: z.ZodObject<{
    success: z.ZodOptional<z.ZodBoolean>;
    links: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
}, "strip", z.ZodTypeAny, {
    links?: string[] | undefined;
    success?: boolean | undefined;
}, {
    links?: string[] | undefined;
    success?: boolean | undefined;
}>;
export declare const scrapeResponseSchema: z.ZodObject<{
    success: z.ZodOptional<z.ZodBoolean>;
    data: z.ZodOptional<z.ZodObject<{
        markdown: z.ZodOptional<z.ZodString>;
        html: z.ZodNullable<z.ZodOptional<z.ZodString>>;
        rawHtml: z.ZodNullable<z.ZodOptional<z.ZodString>>;
        screenshot: z.ZodNullable<z.ZodOptional<z.ZodString>>;
        links: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        actions: z.ZodNullable<z.ZodOptional<z.ZodObject<{
            screenshots: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        }, "strip", z.ZodTypeAny, {
            screenshots?: string[] | undefined;
        }, {
            screenshots?: string[] | undefined;
        }>>>;
        metadata: z.ZodOptional<z.ZodObject<{
            title: z.ZodOptional<z.ZodString>;
            description: z.ZodOptional<z.ZodString>;
            language: z.ZodNullable<z.ZodOptional<z.ZodString>>;
            sourceURL: z.ZodOptional<z.ZodString>;
            '<any other metadata> ': z.ZodOptional<z.ZodString>;
            statusCode: z.ZodOptional<z.ZodNumber>;
            error: z.ZodNullable<z.ZodOptional<z.ZodString>>;
        }, "strip", z.ZodTypeAny, {
            error?: string | null | undefined;
            title?: string | undefined;
            description?: string | undefined;
            language?: string | null | undefined;
            sourceURL?: string | undefined;
            '<any other metadata> '?: string | undefined;
            statusCode?: number | undefined;
        }, {
            error?: string | null | undefined;
            title?: string | undefined;
            description?: string | undefined;
            language?: string | null | undefined;
            sourceURL?: string | undefined;
            '<any other metadata> '?: string | undefined;
            statusCode?: number | undefined;
        }>>;
        llm_extraction: z.ZodNullable<z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>>;
        warning: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    }, "strip", z.ZodTypeAny, {
        markdown?: string | undefined;
        html?: string | null | undefined;
        rawHtml?: string | null | undefined;
        links?: string[] | undefined;
        screenshot?: string | null | undefined;
        actions?: {
            screenshots?: string[] | undefined;
        } | null | undefined;
        metadata?: {
            error?: string | null | undefined;
            title?: string | undefined;
            description?: string | undefined;
            language?: string | null | undefined;
            sourceURL?: string | undefined;
            '<any other metadata> '?: string | undefined;
            statusCode?: number | undefined;
        } | undefined;
        llm_extraction?: Record<string, unknown> | null | undefined;
        warning?: string | null | undefined;
    }, {
        markdown?: string | undefined;
        html?: string | null | undefined;
        rawHtml?: string | null | undefined;
        links?: string[] | undefined;
        screenshot?: string | null | undefined;
        actions?: {
            screenshots?: string[] | undefined;
        } | null | undefined;
        metadata?: {
            error?: string | null | undefined;
            title?: string | undefined;
            description?: string | undefined;
            language?: string | null | undefined;
            sourceURL?: string | undefined;
            '<any other metadata> '?: string | undefined;
            statusCode?: number | undefined;
        } | undefined;
        llm_extraction?: Record<string, unknown> | null | undefined;
        warning?: string | null | undefined;
    }>>;
}, "strip", z.ZodTypeAny, {
    success?: boolean | undefined;
    data?: {
        markdown?: string | undefined;
        html?: string | null | undefined;
        rawHtml?: string | null | undefined;
        links?: string[] | undefined;
        screenshot?: string | null | undefined;
        actions?: {
            screenshots?: string[] | undefined;
        } | null | undefined;
        metadata?: {
            error?: string | null | undefined;
            title?: string | undefined;
            description?: string | undefined;
            language?: string | null | undefined;
            sourceURL?: string | undefined;
            '<any other metadata> '?: string | undefined;
            statusCode?: number | undefined;
        } | undefined;
        llm_extraction?: Record<string, unknown> | null | undefined;
        warning?: string | null | undefined;
    } | undefined;
}, {
    success?: boolean | undefined;
    data?: {
        markdown?: string | undefined;
        html?: string | null | undefined;
        rawHtml?: string | null | undefined;
        links?: string[] | undefined;
        screenshot?: string | null | undefined;
        actions?: {
            screenshots?: string[] | undefined;
        } | null | undefined;
        metadata?: {
            error?: string | null | undefined;
            title?: string | undefined;
            description?: string | undefined;
            language?: string | null | undefined;
            sourceURL?: string | undefined;
            '<any other metadata> '?: string | undefined;
            statusCode?: number | undefined;
        } | undefined;
        llm_extraction?: Record<string, unknown> | null | undefined;
        warning?: string | null | undefined;
    } | undefined;
}>;
export declare const scrapeAndExtractFromUrlDataSchema: z.ZodObject<{
    body: z.ZodObject<{
        url: z.ZodString;
        formats: z.ZodOptional<z.ZodArray<z.ZodUnion<[z.ZodLiteral<"markdown">, z.ZodLiteral<"html">, z.ZodLiteral<"rawHtml">, z.ZodLiteral<"links">, z.ZodLiteral<"screenshot">, z.ZodLiteral<"extract">, z.ZodLiteral<"screenshot@fullPage">]>, "many">>;
        onlyMainContent: z.ZodOptional<z.ZodBoolean>;
        includeTags: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        excludeTags: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        headers: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
        waitFor: z.ZodOptional<z.ZodNumber>;
        timeout: z.ZodOptional<z.ZodNumber>;
        extract: z.ZodOptional<z.ZodObject<{
            schema: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
            systemPrompt: z.ZodOptional<z.ZodString>;
            prompt: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            schema?: Record<string, unknown> | undefined;
            systemPrompt?: string | undefined;
            prompt?: string | undefined;
        }, {
            schema?: Record<string, unknown> | undefined;
            systemPrompt?: string | undefined;
            prompt?: string | undefined;
        }>>;
        actions: z.ZodOptional<z.ZodArray<z.ZodUnion<[z.ZodObject<{
            type: z.ZodLiteral<"wait">;
            milliseconds: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            type: "wait";
            milliseconds: number;
        }, {
            type: "wait";
            milliseconds: number;
        }>, z.ZodObject<{
            type: z.ZodLiteral<"screenshot">;
            fullPage: z.ZodOptional<z.ZodBoolean>;
        }, "strip", z.ZodTypeAny, {
            type: "screenshot";
            fullPage?: boolean | undefined;
        }, {
            type: "screenshot";
            fullPage?: boolean | undefined;
        }>, z.ZodObject<{
            type: z.ZodLiteral<"click">;
            selector: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            type: "click";
            selector: string;
        }, {
            type: "click";
            selector: string;
        }>, z.ZodObject<{
            type: z.ZodLiteral<"write">;
            text: z.ZodString;
            selector: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            type: "write";
            selector: string;
            text: string;
        }, {
            type: "write";
            selector: string;
            text: string;
        }>, z.ZodObject<{
            type: z.ZodLiteral<"press">;
            key: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            type: "press";
            key: string;
        }, {
            type: "press";
            key: string;
        }>, z.ZodObject<{
            type: z.ZodLiteral<"scroll">;
            direction: z.ZodUnion<[z.ZodLiteral<"up">, z.ZodLiteral<"down">]>;
            amount: z.ZodOptional<z.ZodNumber>;
        }, "strip", z.ZodTypeAny, {
            type: "scroll";
            direction: "up" | "down";
            amount?: number | undefined;
        }, {
            type: "scroll";
            direction: "up" | "down";
            amount?: number | undefined;
        }>]>, "many">>;
    }, "strip", z.ZodTypeAny, {
        url: string;
        extract?: {
            schema?: Record<string, unknown> | undefined;
            systemPrompt?: string | undefined;
            prompt?: string | undefined;
        } | undefined;
        headers?: Record<string, unknown> | undefined;
        formats?: ("markdown" | "html" | "rawHtml" | "links" | "screenshot" | "extract" | "screenshot@fullPage")[] | undefined;
        onlyMainContent?: boolean | undefined;
        includeTags?: string[] | undefined;
        excludeTags?: string[] | undefined;
        waitFor?: number | undefined;
        timeout?: number | undefined;
        actions?: ({
            type: "wait";
            milliseconds: number;
        } | {
            type: "screenshot";
            fullPage?: boolean | undefined;
        } | {
            type: "click";
            selector: string;
        } | {
            type: "write";
            selector: string;
            text: string;
        } | {
            type: "press";
            key: string;
        } | {
            type: "scroll";
            direction: "up" | "down";
            amount?: number | undefined;
        })[] | undefined;
    }, {
        url: string;
        extract?: {
            schema?: Record<string, unknown> | undefined;
            systemPrompt?: string | undefined;
            prompt?: string | undefined;
        } | undefined;
        headers?: Record<string, unknown> | undefined;
        formats?: ("markdown" | "html" | "rawHtml" | "links" | "screenshot" | "extract" | "screenshot@fullPage")[] | undefined;
        onlyMainContent?: boolean | undefined;
        includeTags?: string[] | undefined;
        excludeTags?: string[] | undefined;
        waitFor?: number | undefined;
        timeout?: number | undefined;
        actions?: ({
            type: "wait";
            milliseconds: number;
        } | {
            type: "screenshot";
            fullPage?: boolean | undefined;
        } | {
            type: "click";
            selector: string;
        } | {
            type: "write";
            selector: string;
            text: string;
        } | {
            type: "press";
            key: string;
        } | {
            type: "scroll";
            direction: "up" | "down";
            amount?: number | undefined;
        })[] | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    body: {
        url: string;
        extract?: {
            schema?: Record<string, unknown> | undefined;
            systemPrompt?: string | undefined;
            prompt?: string | undefined;
        } | undefined;
        headers?: Record<string, unknown> | undefined;
        formats?: ("markdown" | "html" | "rawHtml" | "links" | "screenshot" | "extract" | "screenshot@fullPage")[] | undefined;
        onlyMainContent?: boolean | undefined;
        includeTags?: string[] | undefined;
        excludeTags?: string[] | undefined;
        waitFor?: number | undefined;
        timeout?: number | undefined;
        actions?: ({
            type: "wait";
            milliseconds: number;
        } | {
            type: "screenshot";
            fullPage?: boolean | undefined;
        } | {
            type: "click";
            selector: string;
        } | {
            type: "write";
            selector: string;
            text: string;
        } | {
            type: "press";
            key: string;
        } | {
            type: "scroll";
            direction: "up" | "down";
            amount?: number | undefined;
        })[] | undefined;
    };
}, {
    body: {
        url: string;
        extract?: {
            schema?: Record<string, unknown> | undefined;
            systemPrompt?: string | undefined;
            prompt?: string | undefined;
        } | undefined;
        headers?: Record<string, unknown> | undefined;
        formats?: ("markdown" | "html" | "rawHtml" | "links" | "screenshot" | "extract" | "screenshot@fullPage")[] | undefined;
        onlyMainContent?: boolean | undefined;
        includeTags?: string[] | undefined;
        excludeTags?: string[] | undefined;
        waitFor?: number | undefined;
        timeout?: number | undefined;
        actions?: ({
            type: "wait";
            milliseconds: number;
        } | {
            type: "screenshot";
            fullPage?: boolean | undefined;
        } | {
            type: "click";
            selector: string;
        } | {
            type: "write";
            selector: string;
            text: string;
        } | {
            type: "press";
            key: string;
        } | {
            type: "scroll";
            direction: "up" | "down";
            amount?: number | undefined;
        })[] | undefined;
    };
}>;
export declare const scrapeAndExtractFromUrlResponseSchema: z.ZodObject<{
    success: z.ZodOptional<z.ZodBoolean>;
    data: z.ZodOptional<z.ZodObject<{
        markdown: z.ZodOptional<z.ZodString>;
        html: z.ZodNullable<z.ZodOptional<z.ZodString>>;
        rawHtml: z.ZodNullable<z.ZodOptional<z.ZodString>>;
        screenshot: z.ZodNullable<z.ZodOptional<z.ZodString>>;
        links: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        actions: z.ZodNullable<z.ZodOptional<z.ZodObject<{
            screenshots: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        }, "strip", z.ZodTypeAny, {
            screenshots?: string[] | undefined;
        }, {
            screenshots?: string[] | undefined;
        }>>>;
        metadata: z.ZodOptional<z.ZodObject<{
            title: z.ZodOptional<z.ZodString>;
            description: z.ZodOptional<z.ZodString>;
            language: z.ZodNullable<z.ZodOptional<z.ZodString>>;
            sourceURL: z.ZodOptional<z.ZodString>;
            '<any other metadata> ': z.ZodOptional<z.ZodString>;
            statusCode: z.ZodOptional<z.ZodNumber>;
            error: z.ZodNullable<z.ZodOptional<z.ZodString>>;
        }, "strip", z.ZodTypeAny, {
            error?: string | null | undefined;
            title?: string | undefined;
            description?: string | undefined;
            language?: string | null | undefined;
            sourceURL?: string | undefined;
            '<any other metadata> '?: string | undefined;
            statusCode?: number | undefined;
        }, {
            error?: string | null | undefined;
            title?: string | undefined;
            description?: string | undefined;
            language?: string | null | undefined;
            sourceURL?: string | undefined;
            '<any other metadata> '?: string | undefined;
            statusCode?: number | undefined;
        }>>;
        llm_extraction: z.ZodNullable<z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>>;
        warning: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    }, "strip", z.ZodTypeAny, {
        markdown?: string | undefined;
        html?: string | null | undefined;
        rawHtml?: string | null | undefined;
        links?: string[] | undefined;
        screenshot?: string | null | undefined;
        actions?: {
            screenshots?: string[] | undefined;
        } | null | undefined;
        metadata?: {
            error?: string | null | undefined;
            title?: string | undefined;
            description?: string | undefined;
            language?: string | null | undefined;
            sourceURL?: string | undefined;
            '<any other metadata> '?: string | undefined;
            statusCode?: number | undefined;
        } | undefined;
        llm_extraction?: Record<string, unknown> | null | undefined;
        warning?: string | null | undefined;
    }, {
        markdown?: string | undefined;
        html?: string | null | undefined;
        rawHtml?: string | null | undefined;
        links?: string[] | undefined;
        screenshot?: string | null | undefined;
        actions?: {
            screenshots?: string[] | undefined;
        } | null | undefined;
        metadata?: {
            error?: string | null | undefined;
            title?: string | undefined;
            description?: string | undefined;
            language?: string | null | undefined;
            sourceURL?: string | undefined;
            '<any other metadata> '?: string | undefined;
            statusCode?: number | undefined;
        } | undefined;
        llm_extraction?: Record<string, unknown> | null | undefined;
        warning?: string | null | undefined;
    }>>;
}, "strip", z.ZodTypeAny, {
    success?: boolean | undefined;
    data?: {
        markdown?: string | undefined;
        html?: string | null | undefined;
        rawHtml?: string | null | undefined;
        links?: string[] | undefined;
        screenshot?: string | null | undefined;
        actions?: {
            screenshots?: string[] | undefined;
        } | null | undefined;
        metadata?: {
            error?: string | null | undefined;
            title?: string | undefined;
            description?: string | undefined;
            language?: string | null | undefined;
            sourceURL?: string | undefined;
            '<any other metadata> '?: string | undefined;
            statusCode?: number | undefined;
        } | undefined;
        llm_extraction?: Record<string, unknown> | null | undefined;
        warning?: string | null | undefined;
    } | undefined;
}, {
    success?: boolean | undefined;
    data?: {
        markdown?: string | undefined;
        html?: string | null | undefined;
        rawHtml?: string | null | undefined;
        links?: string[] | undefined;
        screenshot?: string | null | undefined;
        actions?: {
            screenshots?: string[] | undefined;
        } | null | undefined;
        metadata?: {
            error?: string | null | undefined;
            title?: string | undefined;
            description?: string | undefined;
            language?: string | null | undefined;
            sourceURL?: string | undefined;
            '<any other metadata> '?: string | undefined;
            statusCode?: number | undefined;
        } | undefined;
        llm_extraction?: Record<string, unknown> | null | undefined;
        warning?: string | null | undefined;
    } | undefined;
}>;
export declare const scrapeAndExtractFromUrlErrorSchema: z.ZodObject<{
    error: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    error?: string | undefined;
}, {
    error?: string | undefined;
}>;
export declare const getCrawlStatusDataSchema: z.ZodObject<{
    path: z.ZodObject<{
        id: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        id: string;
    }, {
        id: string;
    }>;
}, "strip", z.ZodTypeAny, {
    path: {
        id: string;
    };
}, {
    path: {
        id: string;
    };
}>;
export declare const getCrawlStatusResponseSchema: z.ZodObject<{
    status: z.ZodOptional<z.ZodString>;
    total: z.ZodOptional<z.ZodNumber>;
    completed: z.ZodOptional<z.ZodNumber>;
    creditsUsed: z.ZodOptional<z.ZodNumber>;
    expiresAt: z.ZodOptional<z.ZodString>;
    next: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    data: z.ZodOptional<z.ZodArray<z.ZodObject<{
        markdown: z.ZodOptional<z.ZodString>;
        html: z.ZodNullable<z.ZodOptional<z.ZodString>>;
        rawHtml: z.ZodNullable<z.ZodOptional<z.ZodString>>;
        links: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        screenshot: z.ZodNullable<z.ZodOptional<z.ZodString>>;
        metadata: z.ZodOptional<z.ZodObject<{
            title: z.ZodOptional<z.ZodString>;
            description: z.ZodOptional<z.ZodString>;
            language: z.ZodNullable<z.ZodOptional<z.ZodString>>;
            sourceURL: z.ZodOptional<z.ZodString>;
            '<any other metadata> ': z.ZodOptional<z.ZodString>;
            statusCode: z.ZodOptional<z.ZodNumber>;
            error: z.ZodNullable<z.ZodOptional<z.ZodString>>;
        }, "strip", z.ZodTypeAny, {
            error?: string | null | undefined;
            title?: string | undefined;
            description?: string | undefined;
            language?: string | null | undefined;
            sourceURL?: string | undefined;
            '<any other metadata> '?: string | undefined;
            statusCode?: number | undefined;
        }, {
            error?: string | null | undefined;
            title?: string | undefined;
            description?: string | undefined;
            language?: string | null | undefined;
            sourceURL?: string | undefined;
            '<any other metadata> '?: string | undefined;
            statusCode?: number | undefined;
        }>>;
    }, "strip", z.ZodTypeAny, {
        markdown?: string | undefined;
        html?: string | null | undefined;
        rawHtml?: string | null | undefined;
        links?: string[] | undefined;
        screenshot?: string | null | undefined;
        metadata?: {
            error?: string | null | undefined;
            title?: string | undefined;
            description?: string | undefined;
            language?: string | null | undefined;
            sourceURL?: string | undefined;
            '<any other metadata> '?: string | undefined;
            statusCode?: number | undefined;
        } | undefined;
    }, {
        markdown?: string | undefined;
        html?: string | null | undefined;
        rawHtml?: string | null | undefined;
        links?: string[] | undefined;
        screenshot?: string | null | undefined;
        metadata?: {
            error?: string | null | undefined;
            title?: string | undefined;
            description?: string | undefined;
            language?: string | null | undefined;
            sourceURL?: string | undefined;
            '<any other metadata> '?: string | undefined;
            statusCode?: number | undefined;
        } | undefined;
    }>, "many">>;
}, "strip", z.ZodTypeAny, {
    status?: string | undefined;
    total?: number | undefined;
    completed?: number | undefined;
    creditsUsed?: number | undefined;
    expiresAt?: string | undefined;
    next?: string | null | undefined;
    data?: {
        markdown?: string | undefined;
        html?: string | null | undefined;
        rawHtml?: string | null | undefined;
        links?: string[] | undefined;
        screenshot?: string | null | undefined;
        metadata?: {
            error?: string | null | undefined;
            title?: string | undefined;
            description?: string | undefined;
            language?: string | null | undefined;
            sourceURL?: string | undefined;
            '<any other metadata> '?: string | undefined;
            statusCode?: number | undefined;
        } | undefined;
    }[] | undefined;
}, {
    status?: string | undefined;
    total?: number | undefined;
    completed?: number | undefined;
    creditsUsed?: number | undefined;
    expiresAt?: string | undefined;
    next?: string | null | undefined;
    data?: {
        markdown?: string | undefined;
        html?: string | null | undefined;
        rawHtml?: string | null | undefined;
        links?: string[] | undefined;
        screenshot?: string | null | undefined;
        metadata?: {
            error?: string | null | undefined;
            title?: string | undefined;
            description?: string | undefined;
            language?: string | null | undefined;
            sourceURL?: string | undefined;
            '<any other metadata> '?: string | undefined;
            statusCode?: number | undefined;
        } | undefined;
    }[] | undefined;
}>;
export declare const getCrawlStatusErrorSchema: z.ZodObject<{
    error: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    error?: string | undefined;
}, {
    error?: string | undefined;
}>;
export declare const cancelCrawlDataSchema: z.ZodObject<{
    path: z.ZodObject<{
        id: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        id: string;
    }, {
        id: string;
    }>;
}, "strip", z.ZodTypeAny, {
    path: {
        id: string;
    };
}, {
    path: {
        id: string;
    };
}>;
export declare const cancelCrawlResponseSchema: z.ZodObject<{
    success: z.ZodOptional<z.ZodBoolean>;
    message: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    success?: boolean | undefined;
    message?: string | undefined;
}, {
    success?: boolean | undefined;
    message?: string | undefined;
}>;
export declare const cancelCrawlErrorSchema: z.ZodObject<{
    error: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    error?: string | undefined;
}, {
    error?: string | undefined;
}>;
export declare const crawlUrlsDataSchema: z.ZodObject<{
    body: z.ZodObject<{
        url: z.ZodString;
        excludePaths: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        includePaths: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        maxDepth: z.ZodOptional<z.ZodNumber>;
        ignoreSitemap: z.ZodOptional<z.ZodBoolean>;
        limit: z.ZodOptional<z.ZodNumber>;
        allowBackwardLinks: z.ZodOptional<z.ZodBoolean>;
        allowExternalLinks: z.ZodOptional<z.ZodBoolean>;
        webhook: z.ZodOptional<z.ZodString>;
        scrapeOptions: z.ZodOptional<z.ZodObject<{
            formats: z.ZodOptional<z.ZodArray<z.ZodUnion<[z.ZodLiteral<"markdown">, z.ZodLiteral<"html">, z.ZodLiteral<"rawHtml">, z.ZodLiteral<"links">, z.ZodLiteral<"screenshot">]>, "many">>;
            headers: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
            includeTags: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
            excludeTags: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
            onlyMainContent: z.ZodOptional<z.ZodBoolean>;
            waitFor: z.ZodOptional<z.ZodNumber>;
        }, "strip", z.ZodTypeAny, {
            headers?: Record<string, unknown> | undefined;
            formats?: ("markdown" | "html" | "rawHtml" | "links" | "screenshot")[] | undefined;
            onlyMainContent?: boolean | undefined;
            includeTags?: string[] | undefined;
            excludeTags?: string[] | undefined;
            waitFor?: number | undefined;
        }, {
            headers?: Record<string, unknown> | undefined;
            formats?: ("markdown" | "html" | "rawHtml" | "links" | "screenshot")[] | undefined;
            onlyMainContent?: boolean | undefined;
            includeTags?: string[] | undefined;
            excludeTags?: string[] | undefined;
            waitFor?: number | undefined;
        }>>;
    }, "strip", z.ZodTypeAny, {
        url: string;
        excludePaths?: string[] | undefined;
        includePaths?: string[] | undefined;
        maxDepth?: number | undefined;
        ignoreSitemap?: boolean | undefined;
        limit?: number | undefined;
        allowBackwardLinks?: boolean | undefined;
        allowExternalLinks?: boolean | undefined;
        webhook?: string | undefined;
        scrapeOptions?: {
            headers?: Record<string, unknown> | undefined;
            formats?: ("markdown" | "html" | "rawHtml" | "links" | "screenshot")[] | undefined;
            onlyMainContent?: boolean | undefined;
            includeTags?: string[] | undefined;
            excludeTags?: string[] | undefined;
            waitFor?: number | undefined;
        } | undefined;
    }, {
        url: string;
        excludePaths?: string[] | undefined;
        includePaths?: string[] | undefined;
        maxDepth?: number | undefined;
        ignoreSitemap?: boolean | undefined;
        limit?: number | undefined;
        allowBackwardLinks?: boolean | undefined;
        allowExternalLinks?: boolean | undefined;
        webhook?: string | undefined;
        scrapeOptions?: {
            headers?: Record<string, unknown> | undefined;
            formats?: ("markdown" | "html" | "rawHtml" | "links" | "screenshot")[] | undefined;
            onlyMainContent?: boolean | undefined;
            includeTags?: string[] | undefined;
            excludeTags?: string[] | undefined;
            waitFor?: number | undefined;
        } | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    body: {
        url: string;
        excludePaths?: string[] | undefined;
        includePaths?: string[] | undefined;
        maxDepth?: number | undefined;
        ignoreSitemap?: boolean | undefined;
        limit?: number | undefined;
        allowBackwardLinks?: boolean | undefined;
        allowExternalLinks?: boolean | undefined;
        webhook?: string | undefined;
        scrapeOptions?: {
            headers?: Record<string, unknown> | undefined;
            formats?: ("markdown" | "html" | "rawHtml" | "links" | "screenshot")[] | undefined;
            onlyMainContent?: boolean | undefined;
            includeTags?: string[] | undefined;
            excludeTags?: string[] | undefined;
            waitFor?: number | undefined;
        } | undefined;
    };
}, {
    body: {
        url: string;
        excludePaths?: string[] | undefined;
        includePaths?: string[] | undefined;
        maxDepth?: number | undefined;
        ignoreSitemap?: boolean | undefined;
        limit?: number | undefined;
        allowBackwardLinks?: boolean | undefined;
        allowExternalLinks?: boolean | undefined;
        webhook?: string | undefined;
        scrapeOptions?: {
            headers?: Record<string, unknown> | undefined;
            formats?: ("markdown" | "html" | "rawHtml" | "links" | "screenshot")[] | undefined;
            onlyMainContent?: boolean | undefined;
            includeTags?: string[] | undefined;
            excludeTags?: string[] | undefined;
            waitFor?: number | undefined;
        } | undefined;
    };
}>;
export declare const crawlUrlsResponseSchema: z.ZodObject<{
    success: z.ZodOptional<z.ZodBoolean>;
    id: z.ZodOptional<z.ZodString>;
    url: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    url?: string | undefined;
    success?: boolean | undefined;
    id?: string | undefined;
}, {
    url?: string | undefined;
    success?: boolean | undefined;
    id?: string | undefined;
}>;
export declare const crawlUrlsErrorSchema: z.ZodObject<{
    error: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    error?: string | undefined;
}, {
    error?: string | undefined;
}>;
export declare const mapUrlsDataSchema: z.ZodObject<{
    body: z.ZodObject<{
        url: z.ZodString;
        search: z.ZodOptional<z.ZodString>;
        ignoreSitemap: z.ZodOptional<z.ZodBoolean>;
        includeSubdomains: z.ZodOptional<z.ZodBoolean>;
        limit: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        url: string;
        ignoreSitemap?: boolean | undefined;
        limit?: number | undefined;
        search?: string | undefined;
        includeSubdomains?: boolean | undefined;
    }, {
        url: string;
        ignoreSitemap?: boolean | undefined;
        limit?: number | undefined;
        search?: string | undefined;
        includeSubdomains?: boolean | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    body: {
        url: string;
        ignoreSitemap?: boolean | undefined;
        limit?: number | undefined;
        search?: string | undefined;
        includeSubdomains?: boolean | undefined;
    };
}, {
    body: {
        url: string;
        ignoreSitemap?: boolean | undefined;
        limit?: number | undefined;
        search?: string | undefined;
        includeSubdomains?: boolean | undefined;
    };
}>;
export declare const mapUrlsResponseSchema: z.ZodObject<{
    success: z.ZodOptional<z.ZodBoolean>;
    links: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
}, "strip", z.ZodTypeAny, {
    links?: string[] | undefined;
    success?: boolean | undefined;
}, {
    links?: string[] | undefined;
    success?: boolean | undefined;
}>;
export declare const mapUrlsErrorSchema: z.ZodObject<{
    error: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    error?: string | undefined;
}, {
    error?: string | undefined;
}>;
//# sourceMappingURL=zodSchema.d.ts.map