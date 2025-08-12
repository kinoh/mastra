import type { IMastraLogger } from '@mastra/core/logger';
export declare function getTelemetryBundler(entryFile: string, result: {
    hasCustomConfig: false;
}, logger: IMastraLogger): Promise<import("rollup").RollupBuild>;
export declare function writeTelemetryConfig({ entryFile, outputDir, options, logger, }: {
    entryFile: string;
    outputDir: string;
    options: {
        sourcemap?: boolean;
    };
    logger: IMastraLogger;
}): Promise<{
    hasCustomConfig: boolean;
    externalDependencies: string[];
}>;
//# sourceMappingURL=telemetry.d.ts.map