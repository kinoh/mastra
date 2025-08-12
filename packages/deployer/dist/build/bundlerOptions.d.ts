import type { Config } from '@mastra/core';
export declare function getBundlerOptionsBundler(entryFile: string, result: {
    hasCustomConfig: false;
}): Promise<import("rollup").RollupBuild>;
export declare function getBundlerOptions(entryFile: string, outputDir: string): Promise<Config['bundler'] | null>;
//# sourceMappingURL=bundlerOptions.d.ts.map