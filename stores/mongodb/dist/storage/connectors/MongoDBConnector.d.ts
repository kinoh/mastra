import { MongoClient } from 'mongodb';
import type { DatabaseConfig } from '../types.js';
import type { ConnectorHandler } from './base.js';
type MongoDBConnectorOptions = {
    client: MongoClient;
    dbName: string;
    handler: undefined;
} | {
    client: undefined;
    dbName: undefined;
    handler: ConnectorHandler;
};
export declare class MongoDBConnector {
    #private;
    constructor(options: MongoDBConnectorOptions);
    static fromDatabaseConfig(config: DatabaseConfig): MongoDBConnector;
    static fromConnectionHandler(handler: ConnectorHandler): MongoDBConnector;
    private getConnection;
    getCollection(collectionName: string): Promise<import("mongodb").Collection<import("mongodb").Document>>;
    close(): Promise<void>;
}
export {};
//# sourceMappingURL=MongoDBConnector.d.ts.map