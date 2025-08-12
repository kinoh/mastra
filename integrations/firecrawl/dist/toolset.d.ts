import { OpenAPIToolset } from '@mastra/core/integration';
import type { ToolAction } from '@mastra/core/tools';
import * as integrationClient from './client/sdk.gen.js';
import * as zodSchema from './client/zodSchema.js';
import type { FirecrawlConfig } from './types.js';
export declare class FirecrawlToolset extends OpenAPIToolset {
    readonly name = "FIRECRAWL";
    readonly logoUrl = "";
    config: FirecrawlConfig;
    readonly tools: Record<Exclude<keyof typeof integrationClient, 'client'>, ToolAction<any, any, any>>;
    categories: string[];
    description: string;
    constructor({ config }: {
        config: FirecrawlConfig;
    });
    protected get toolSchemas(): typeof zodSchema;
    protected get toolDocumentations(): {
        scrape: {
            comment: string;
            doc: string;
        };
        crawlUrls: {
            comment: string;
            doc: string;
        };
        searchGoogle: {
            comment: string;
            doc: string;
        };
        getCrawlStatus: {
            comment: string;
            doc: string;
        };
        cancelCrawlJob: {
            comment: string;
            doc: string;
        };
    };
    protected get baseClient(): typeof integrationClient;
    getApiClient: () => Promise<typeof integrationClient>;
}
//# sourceMappingURL=toolset.d.ts.map