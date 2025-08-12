import { StoreOperations } from '@mastra/core/storage';
import type { TABLE_NAMES, StorageColumn } from '@mastra/core/storage';
import type { Redis } from '@upstash/redis';
export declare class StoreOperationsUpstash extends StoreOperations {
    private client;
    constructor({ client }: {
        client: Redis;
    });
    createTable({ tableName: _tableName, schema: _schema, }: {
        tableName: TABLE_NAMES;
        schema: Record<string, StorageColumn>;
    }): Promise<void>;
    alterTable({ tableName: _tableName, schema: _schema, ifNotExists: _ifNotExists, }: {
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
    insert({ tableName, record }: {
        tableName: TABLE_NAMES;
        record: Record<string, any>;
    }): Promise<void>;
    batchInsert(input: {
        tableName: TABLE_NAMES;
        records: Record<string, any>[];
    }): Promise<void>;
    load<R>({ tableName, keys }: {
        tableName: TABLE_NAMES;
        keys: Record<string, string>;
    }): Promise<R | null>;
    hasColumn(_tableName: TABLE_NAMES, _column: string): Promise<boolean>;
    scanKeys(pattern: string, batchSize?: number): Promise<string[]>;
    scanAndDelete(pattern: string, batchSize?: number): Promise<number>;
}
//# sourceMappingURL=index.d.ts.map