import { Deployer } from '@mastra/deployer';
export declare class VercelDeployer extends Deployer {
    constructor();
    prepare(outputDirectory: string): Promise<void>;
    private getEntry;
    private writeVercelJSON;
    bundle(entryFile: string, outputDirectory: string, toolsPaths: (string | string[])[]): Promise<void>;
    deploy(): Promise<void>;
    lint(entryFile: string, outputDirectory: string, toolsPaths: (string | string[])[]): Promise<void>;
}
//# sourceMappingURL=index.d.ts.map