import { Deployer } from '@mastra/deployer';
export declare class NetlifyDeployer extends Deployer {
    constructor();
    protected installDependencies(outputDirectory: string, rootDir?: string): Promise<void>;
    deploy(): Promise<void>;
    prepare(outputDirectory: string): Promise<void>;
    bundle(entryFile: string, outputDirectory: string, toolsPaths: (string | string[])[]): Promise<void>;
    private getEntry;
    lint(entryFile: string, outputDirectory: string, toolsPaths: (string | string[])[]): Promise<void>;
}
//# sourceMappingURL=index.d.ts.map