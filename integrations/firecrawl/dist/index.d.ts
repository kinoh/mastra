import { Integration } from '@mastra/core/integration';
import type * as integrationClient from './client/sdk.gen.js';
import { FirecrawlToolset } from './toolset.js';
import type { FirecrawlConfig } from './types.js';
export declare class FirecrawlIntegration extends Integration<void, typeof integrationClient> {
    readonly name = "FIRECRAWL";
    readonly logoUrl = "";
    config: FirecrawlConfig;
    categories: string[];
    description: string;
    openapi: FirecrawlToolset;
    constructor({ config }: {
        config: FirecrawlConfig;
    });
    getStaticTools(): {
        scrapeAndExtractFromUrl: import("@mastra/core").ToolAction<any, any, any>;
        getCrawlStatus: import("@mastra/core").ToolAction<any, any, any>;
        cancelCrawl: import("@mastra/core").ToolAction<any, any, any>;
        crawlUrls: import("@mastra/core").ToolAction<any, any, any>;
        mapUrls: import("@mastra/core").ToolAction<any, any, any>;
    };
    getApiClient(): Promise<typeof integrationClient>;
}
//# sourceMappingURL=index.d.ts.map