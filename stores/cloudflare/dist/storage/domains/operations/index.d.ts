import type { KVNamespace } from '@cloudflare/workers-types';
import { StoreOperations } from '@mastra/core/storage';
import type { StorageColumn, TABLE_NAMES } from '@mastra/core/storage';
import type Cloudflare from 'cloudflare';
import type { ListOptions, RecordTypes } from '../../types.js';
export declare class StoreOperationsCloudflare extends StoreOperations {
    private bindings?;
    client?: Cloudflare;
    accountId?: string;
    namespacePrefix: string;
    constructor({ namespacePrefix, bindings, client, accountId, }: {
        bindings?: Record<TABLE_NAMES, KVNamespace>;
        namespacePrefix: string;
        client?: Cloudflare;
        accountId?: string;
    });
    hasColumn(): Promise<boolean>;
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
    private getBinding;
    getKey<T extends TABLE_NAMES>(tableName: T, record: Record<string, string>): string;
    private getSchemaKey;
    /**
     * Helper to safely parse data from KV storage
     */
    private safeParse;
    private createNamespaceById;
    private createNamespace;
    private listNamespaces;
    private getNamespaceIdByName;
    private getOrCreateNamespaceId;
    private getNamespaceId;
    private getNamespaceValue;
    getKV(tableName: TABLE_NAMES, key: string): Promise<any>;
    private getTableSchema;
    private validateColumnValue;
    private validateAgainstSchema;
    private validateRecord;
    insert({ tableName, record }: {
        tableName: TABLE_NAMES;
        record: Record<string, any>;
    }): Promise<void>;
    private ensureMetadata;
    load<R>({ tableName, keys }: {
        tableName: TABLE_NAMES;
        keys: Record<string, string>;
    }): Promise<R | null>;
    batchInsert<T extends TABLE_NAMES>(input: {
        tableName: T;
        records: Partial<RecordTypes[T]>[];
    }): Promise<void>;
    /**
     * Helper to safely serialize data for KV storage
     */
    private safeSerialize;
    private putNamespaceValue;
    putKV({ tableName, key, value, metadata, }: {
        tableName: TABLE_NAMES;
        key: string;
        value: any;
        metadata?: any;
    }): Promise<void>;
    createTable({ tableName, schema, }: {
        tableName: TABLE_NAMES;
        schema: Record<string, StorageColumn>;
    }): Promise<void>;
    listNamespaceKeys(tableName: TABLE_NAMES, options?: ListOptions): Promise<import("@cloudflare/workers-types").KVNamespaceListKey<unknown, string>[]>;
    private deleteNamespaceValue;
    deleteKV(tableName: TABLE_NAMES, key: string): Promise<void>;
    listKV(tableName: TABLE_NAMES, options?: ListOptions): Promise<Array<{
        name: string;
    }>>;
}
//# sourceMappingURL=index.d.ts.map