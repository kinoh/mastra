/**
 * Type definition for SQL query parameters
 */
export type SqlParam = string | number | boolean | null | undefined;
/**
 * Interface for SQL query options with generic type support
 */
export interface SqlQueryOptions {
    /** SQL query to execute */
    sql: string;
    /** Parameters to bind to the query */
    params?: SqlParam[];
    /** Whether to return only the first result */
    first?: boolean;
}
/**
 * SQL Builder class for constructing type-safe SQL queries
 * This helps create maintainable and secure SQL queries with proper parameter handling
 */
export declare class SqlBuilder {
    private sql;
    private params;
    private whereAdded;
    select(columns?: string | string[]): SqlBuilder;
    from(table: string): SqlBuilder;
    /**
     * Add a WHERE clause to the query
     * @param condition The condition to add
     * @param params Parameters to bind to the condition
     */
    where(condition: string, ...params: SqlParam[]): SqlBuilder;
    /**
     * Add a WHERE clause if it hasn't been added yet, otherwise add an AND clause
     * @param condition The condition to add
     * @param params Parameters to bind to the condition
     */
    whereAnd(condition: string, ...params: SqlParam[]): SqlBuilder;
    andWhere(condition: string, ...params: SqlParam[]): SqlBuilder;
    orWhere(condition: string, ...params: SqlParam[]): SqlBuilder;
    orderBy(column: string, direction?: 'ASC' | 'DESC'): SqlBuilder;
    limit(count: number): SqlBuilder;
    offset(count: number): SqlBuilder;
    count(): SqlBuilder;
    /**
     * Insert a row, or update specific columns on conflict (upsert).
     * @param table Table name
     * @param columns Columns to insert
     * @param values Values to insert
     * @param conflictColumns Columns to check for conflict (usually PK or UNIQUE)
     * @param updateMap Object mapping columns to update to their new value (e.g. { name: 'excluded.name' })
     */
    insert(table: string, columns: string[], values: SqlParam[], conflictColumns?: string[], updateMap?: Record<string, string>): SqlBuilder;
    update(table: string, columns: string[], values: SqlParam[]): SqlBuilder;
    delete(table: string): SqlBuilder;
    /**
     * Create a table if it doesn't exist
     * @param table The table name
     * @param columnDefinitions The column definitions as an array of strings
     * @param tableConstraints Optional constraints for the table
     * @returns The builder instance
     */
    createTable(table: string, columnDefinitions: string[], tableConstraints?: string[]): SqlBuilder;
    /**
     * Check if an index exists in the database
     * @param indexName The name of the index to check
     * @param tableName The table the index is on
     * @returns The builder instance
     */
    checkIndexExists(indexName: string, tableName: string): SqlBuilder;
    /**
     * Create an index if it doesn't exist
     * @param indexName The name of the index to create
     * @param tableName The table to create the index on
     * @param columnName The column to index
     * @param indexType Optional index type (e.g., 'UNIQUE')
     * @returns The builder instance
     */
    createIndex(indexName: string, tableName: string, columnName: string, indexType?: string): SqlBuilder;
    /**
     * Add a LIKE condition to the query
     * @param column The column to check
     * @param value The value to match (will be wrapped with % for LIKE)
     * @param exact If true, will not add % wildcards
     */
    like(column: string, value: string, exact?: boolean): SqlBuilder;
    /**
     * Add a JSON LIKE condition for searching in JSON fields
     * @param column The JSON column to search in
     * @param key The JSON key to match
     * @param value The value to match
     */
    jsonLike(column: string, key: string, value: string): SqlBuilder;
    /**
     * Get the built query
     * @returns Object containing the SQL string and parameters array
     */
    build(): {
        sql: string;
        params: SqlParam[];
    };
    /**
     * Reset the builder for reuse
     * @returns The reset builder instance
     */
    reset(): SqlBuilder;
}
export declare function createSqlBuilder(): SqlBuilder;
/** Represents a validated SQL SELECT column identifier (or '*', optionally with 'AS alias'). */
type SelectIdentifier = string & {
    __brand: 'SelectIdentifier';
};
/**
 * Parses and returns a valid SQL SELECT column identifier.
 * Allows a single identifier (letters, numbers, underscores), or '*', optionally with 'AS alias'.
 *
 * @param column - The column identifier string to parse.
 * @returns The validated column identifier as a branded type.
 * @throws {Error} If invalid.
 *
 * @example
 * const col = parseSelectIdentifier('user_id'); // Ok
 * parseSelectIdentifier('user_id AS uid'); // Ok
 * parseSelectIdentifier('*'); // Ok
 * parseSelectIdentifier('user id'); // Throws error
 */
export declare function parseSelectIdentifier(column: string): SelectIdentifier;
export {};
//# sourceMappingURL=sql-builder.d.ts.map