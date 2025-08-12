export declare const config: {
    readonly name: "PROJECT_NAME";
    readonly integrations: readonly [];
    readonly db: {
        readonly provider: "postgres";
        readonly uri: string;
    };
    readonly runner: {
        readonly provider: "inngest";
        readonly uri: string;
        readonly signingKey: string;
        readonly eventKey: string;
    };
    readonly workflows: {
        readonly blueprintDirPath: "/mastra/blueprints";
        readonly systemEvents: {};
        readonly systemApis: readonly [];
    };
    readonly agents: {
        readonly agentDirPath: "/mastra/agents";
        readonly vectorProvider: readonly [];
    };
    readonly systemHostURL: string;
    readonly routeRegistrationPath: "/api/mastra";
};
//# sourceMappingURL=config.d.ts.map