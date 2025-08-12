import { StoreOperations } from '@mastra/core/storage';
import type { StorageColumn, TABLE_NAMES } from '@mastra/core/storage';
import type { ConnectorHandler } from '../../connectors/base.js';
export interface MongoDBOperationsConfig {
    connector: ConnectorHandler;
}
export declare class StoreOperationsMongoDB extends StoreOperations {
    #private;
    constructor(config: MongoDBOperationsConfig);
    getCollection(collectionName: string): Promise<import("mongodb").Collection<import("mongodb").Document>>;
    hasColumn(_table: string, _column: string): Promise<boolean>;
    createTable(): Promise<void>;
    alterTable(_args: {
        tableName: TABLE_NAMES;
        schema: Record<string, StorageColumn>;
        ifNotExists: string[];
    }): Promise<void>;
    clearTable({ tableName }: {
        tableName: TABLE_NAMES;
    }): Promise<void>;
    dropTable({ tableName }: {
        tableName: TABLE_NAMES;
    }): Promise<void>;
    private processJsonbFields;
    insert({ tableName, record }: {
        tableName: TABLE_NAMES;
        record: Record<string, any>;
    }): Promise<void>;
    batchInsert({ tableName, records }: {
        tableName: TABLE_NAMES;
        records: Record<string, any>[];
    }): Promise<void>;
    load<R>({ tableName, keys }: {
        tableName: TABLE_NAMES;
        keys: Record<string, string>;
    }): Promise<R | null>;
}
//# sourceMappingURL=index.d.ts.map