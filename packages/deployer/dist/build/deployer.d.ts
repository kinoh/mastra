import type { MastraDeployer } from '@mastra/core';
export declare function getDeployerBundler(entryFile: string, result: {
    isDeployerRemoved: boolean;
}): Promise<import("rollup").RollupBuild>;
export declare function getDeployer(entryFile: string, outputDir: string): Promise<MastraDeployer | undefined>;
//# sourceMappingURL=deployer.d.ts.map