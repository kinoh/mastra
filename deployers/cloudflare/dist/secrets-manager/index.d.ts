export declare class CloudflareSecretsManager {
    accountId: string;
    apiToken: string;
    baseUrl: string;
    constructor({ accountId, apiToken }: {
        accountId: string;
        apiToken: string;
    });
    createSecret({ workerId, secretName, secretValue, }: {
        workerId: string;
        secretName: string;
        secretValue: string;
    }): Promise<any>;
    createProjectSecrets({ workerId, customerId, envVars, }: {
        workerId: string;
        customerId: string;
        envVars: Record<string, string>;
    }): Promise<any>;
    deleteSecret({ workerId, secretName }: {
        workerId: string;
        secretName: string;
    }): Promise<any>;
    listSecrets(workerId: string): Promise<any>;
}
//# sourceMappingURL=index.d.ts.map