import { Deployer } from '@mastra/deployer';
import type { analyzeBundle } from '@mastra/deployer/analyze';
interface CFRoute {
    pattern: string;
    zone_name: string;
    custom_domain?: boolean;
}
interface D1DatabaseBinding {
    binding: string;
    database_name: string;
    database_id: string;
    preview_database_id?: string;
}
interface KVNamespaceBinding {
    binding: string;
    id: string;
}
export declare class CloudflareDeployer extends Deployer {
    routes?: CFRoute[];
    workerNamespace?: string;
    env?: Record<string, any>;
    projectName?: string;
    d1Databases?: D1DatabaseBinding[];
    kvNamespaces?: KVNamespaceBinding[];
    constructor({ env, projectName, routes, workerNamespace, d1Databases, kvNamespaces, }: {
        env?: Record<string, any>;
        projectName?: string;
        routes?: CFRoute[];
        workerNamespace?: string;
        d1Databases?: D1DatabaseBinding[];
        kvNamespaces?: KVNamespaceBinding[];
    });
    writeFiles(outputDirectory: string): Promise<void>;
    private getEntry;
    prepare(outputDirectory: string): Promise<void>;
    getBundlerOptions(serverFile: string, mastraEntryFile: string, analyzedBundleInfo: Awaited<ReturnType<typeof analyzeBundle>>, toolsPaths: (string | string[])[]): Promise<import("rollup").InputOptions>;
    bundle(entryFile: string, outputDirectory: string, toolsPaths: (string | string[])[]): Promise<void>;
    deploy(): Promise<void>;
    tagWorker(): Promise<void>;
    lint(entryFile: string, outputDirectory: string, toolsPaths: (string | string[])[]): Promise<void>;
}
export {};
//# sourceMappingURL=index.d.ts.map