import type { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';
import { StoreOperations } from '@mastra/core/storage';
import type { StorageColumn, TABLE_NAMES } from '@mastra/core/storage';
import type { Service } from 'electrodb';
export declare class StoreOperationsDynamoDB extends StoreOperations {
    client: DynamoDBDocumentClient;
    tableName: string;
    service: Service<Record<string, any>>;
    constructor({ service, tableName, client, }: {
        service: Service<Record<string, any>>;
        tableName: string;
        client: DynamoDBDocumentClient;
    });
    hasColumn(): Promise<boolean>;
    dropTable(): Promise<void>;
    private getEntityNameForTable;
    /**
     * Pre-processes a record to ensure Date objects are converted to ISO strings
     * This is necessary because ElectroDB validation happens before setters are applied
     */
    private preprocessRecord;
    /**
     * Validates that the required DynamoDB table exists and is accessible.
     * This does not check the table structure - it assumes the table
     * was created with the correct structure via CDK/CloudFormation.
     */
    private validateTableExists;
    /**
     * This method is modified for DynamoDB with ElectroDB single-table design.
     * It assumes the table is created and managed externally via CDK/CloudFormation.
     *
     * This implementation only validates that the required table exists and is accessible.
     * No table creation is attempted - we simply check if we can access the table.
     */
    createTable({ tableName }: {
        tableName: TABLE_NAMES;
        schema: Record<string, any>;
    }): Promise<void>;
    insert({ tableName, record }: {
        tableName: TABLE_NAMES;
        record: Record<string, any>;
    }): Promise<void>;
    alterTable(_args: {
        tableName: TABLE_NAMES;
        schema: Record<string, StorageColumn>;
        ifNotExists: string[];
    }): Promise<void>;
    /**
     * Clear all items from a logical "table" (entity type)
     */
    clearTable({ tableName }: {
        tableName: TABLE_NAMES;
    }): Promise<void>;
    /**
     * Insert multiple records as a batch
     */
    batchInsert({ tableName, records }: {
        tableName: TABLE_NAMES;
        records: Record<string, any>[];
    }): Promise<void>;
    /**
     * Load a record by its keys
     */
    load<R>({ tableName, keys }: {
        tableName: TABLE_NAMES;
        keys: Record<string, string>;
    }): Promise<R | null>;
}
//# sourceMappingURL=index.d.ts.map