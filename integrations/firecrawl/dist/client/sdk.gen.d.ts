import type { Options } from '@hey-api/client-fetch';
import type { ScrapeAndExtractFromUrlData, ScrapeAndExtractFromUrlError, GetCrawlStatusData, GetCrawlStatusError, CancelCrawlData, CancelCrawlError, CancelCrawlResponse, CrawlUrlsData, CrawlUrlsError, MapUrlsData, MapUrlsError } from './types.gen.js';
export declare const client: import("@hey-api/client-fetch").Client<Request, Response, import("@hey-api/client-fetch").RequestOptionsBase<false> & import("@hey-api/client-fetch").Config<false> & {
    headers: Headers;
}>;
/**
 * Scrape a single URL and optionally extract information using an LLM
 */
export declare const scrapeAndExtractFromUrl: <ThrowOnError extends boolean = false>(options: Options<ScrapeAndExtractFromUrlData, ThrowOnError>) => import("@hey-api/client-fetch").RequestResult<import("./types.gen").ScrapeResponse, ScrapeAndExtractFromUrlError, ThrowOnError>;
/**
 * Get the status of a crawl job
 */
export declare const getCrawlStatus: <ThrowOnError extends boolean = false>(options: Options<GetCrawlStatusData, ThrowOnError>) => import("@hey-api/client-fetch").RequestResult<import("./types.gen").CrawlStatusResponseObj, GetCrawlStatusError, ThrowOnError>;
/**
 * Cancel a crawl job
 */
export declare const cancelCrawl: <ThrowOnError extends boolean = false>(options: Options<CancelCrawlData, ThrowOnError>) => import("@hey-api/client-fetch").RequestResult<CancelCrawlResponse, CancelCrawlError, ThrowOnError>;
/**
 * Crawl multiple URLs based on options
 */
export declare const crawlUrls: <ThrowOnError extends boolean = false>(options: Options<CrawlUrlsData, ThrowOnError>) => import("@hey-api/client-fetch").RequestResult<import("./types.gen").CrawlResponse, CrawlUrlsError, ThrowOnError>;
/**
 * Map multiple URLs based on options
 */
export declare const mapUrls: <ThrowOnError extends boolean = false>(options: Options<MapUrlsData, ThrowOnError>) => import("@hey-api/client-fetch").RequestResult<import("./types.gen").MapResponse, MapUrlsError, ThrowOnError>;
//# sourceMappingURL=sdk.gen.d.ts.map