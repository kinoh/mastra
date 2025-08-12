import type { IMastraLogger } from '@mastra/core/logger';
export declare function formatDateForMongoDB(date: Date | string): Date;
export declare function createExecuteOperationWithRetry({ logger, maxRetries, initialBackoffMs, }: {
    logger: IMastraLogger;
    maxRetries?: number;
    initialBackoffMs?: number;
}): <T>(operationFn: () => Promise<T>, operationDescription: string) => Promise<T>;
//# sourceMappingURL=utils.d.ts.map