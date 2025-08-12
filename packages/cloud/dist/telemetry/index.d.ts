import type { IMastraLogger } from '@mastra/core/logger';
import type { ExportResult } from '@opentelemetry/core';
import type { ReadableSpan, SpanExporter } from '@opentelemetry/sdk-trace-base';
export type MastraCloudExporterOptions = {
    accessToken?: string;
    endpoint?: string;
    logger?: IMastraLogger;
};
declare class MastraCloudExporter implements SpanExporter {
    private queue;
    private serializer;
    private activeFlush;
    private accessToken;
    private endpoint;
    private logger?;
    constructor({ accessToken, endpoint, logger }?: MastraCloudExporterOptions);
    export(internalRepresentation: ReadableSpan[], resultCallback: (result: ExportResult) => void): void;
    shutdown(): Promise<void>;
    private batchInsert;
    flush(): Promise<void>;
    forceFlush(): Promise<void>;
    __setLogger(logger: IMastraLogger): void;
}
export { MastraCloudExporter };
//# sourceMappingURL=index.d.ts.map