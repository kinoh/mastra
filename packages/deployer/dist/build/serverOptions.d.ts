import type { Config } from '@mastra/core';
export declare function getServerOptionsBundler(entryFile: string, result: {
    hasCustomConfig: false;
}): Promise<import("rollup").RollupBuild>;
export declare function getServerOptions(entryFile: string, outputDir: string): Promise<Config['server'] | null>;
//# sourceMappingURL=serverOptions.d.ts.map