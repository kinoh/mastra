/**
 * Performs a fetch request with automatic retries using exponential backoff
 * @param url The URL to fetch from
 * @param options Standard fetch options
 * @param maxRetries Maximum number of retry attempts
 * @param validateResponse Optional function to validate the response beyond HTTP status
 * @returns The fetch Response if successful
 */
export declare function fetchWithRetry(url: string, options?: RequestInit, maxRetries?: number): Promise<Response>;
//# sourceMappingURL=fetchWithRetry.d.ts.map