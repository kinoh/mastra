import type { TABLE_NAMES } from '@mastra/core/storage';
export declare function ensureDate(value: any): Date | null;
export declare function parseJSON(value: any): any;
export declare function getKey(tableName: TABLE_NAMES, keys: Record<string, any>): string;
export declare function processRecord(tableName: TABLE_NAMES, record: Record<string, any>): {
    key: string;
    processedRecord: {
        createdAt: string | undefined;
        updatedAt: string | undefined;
    };
};
//# sourceMappingURL=utils.d.ts.map