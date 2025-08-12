import type { D1Database } from '@cloudflare/workers-types';
import { StoreOperations } from '@mastra/core/storage';
import type { TABLE_NAMES, StorageColumn } from '@mastra/core/storage';
import type Cloudflare from 'cloudflare';
import type { SqlQueryOptions } from '../../sql-builder.js';
export type D1QueryResult = Awaited<ReturnType<Cloudflare['d1']['database']['query']>>['result'];
export interface D1Client {
    query(args: {
        sql: string;
        params: string[];
    }): Promise<{
        result: D1QueryResult;
    }>;
}
export interface StoreOperationsD1Config {
    client?: D1Client;
    binding?: D1Database;
    tablePrefix?: string;
}
export declare class StoreOperationsD1 extends StoreOperations {
    private client?;
    private binding?;
    private tablePrefix;
    constructor(config: StoreOperationsD1Config);
    hasColumn(table: string, column: string): Promise<boolean>;
    getTableName(tableName: TABLE_NAMES): string;
    private formatSqlParams;
    private executeWorkersBindingQuery;
    private executeRestQuery;
    executeQuery(options: SqlQueryOptions): Promise<Record<string, any>[] | Record<string, any> | null>;
    private getTableColumns;
    private serializeValue;
    protected getSqlType(type: StorageColumn['type']): string;
    createTable({ tableName, schema, }: {
        tableName: TABLE_NAMES;
        schema: Record<string, StorageColumn>;
    }): Promise<void>;
    clearTable({ tableName }: {
        tableName: TABLE_NAMES;
    }): Promise<void>;
    dropTable({ tableName }: {
        tableName: TABLE_NAMES;
    }): Promise<void>;
    alterTable(args: {
        tableName: TABLE_NAMES;
        schema: Record<string, StorageColumn>;
        ifNotExists: string[];
    }): Promise<void>;
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
    processRecord(record: Record<string, any>): Promise<Record<string, any>>;
    /**
     * Upsert multiple records in a batch operation
     * @param tableName The table to insert into
     * @param records The records to insert
     */
    batchUpsert({ tableName, records }: {
        tableName: TABLE_NAMES;
        records: Record<string, any>[];
    }): Promise<void>;
}
//# sourceMappingURL=index.d.ts.map