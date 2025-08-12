export declare const baseAttributes: {
    readonly createdAt: {
        readonly type: "string";
        readonly required: true;
        readonly readOnly: true;
        readonly set: (value?: Date | string) => string;
        readonly default: () => string;
    };
    readonly updatedAt: {
        readonly type: "string";
        readonly required: true;
        readonly set: (value?: Date | string) => string;
        readonly default: () => string;
    };
    readonly metadata: {
        readonly type: "string";
        readonly set: (value?: Record<string, unknown> | string) => string | undefined;
        readonly get: (value?: string) => any;
    };
};
//# sourceMappingURL=utils.d.ts.map