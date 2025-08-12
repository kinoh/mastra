import type { PluginObj } from '@babel/core';
/**
 * Babel plugin that enforces singleton PostgresStore instances in Cloudflare Workers.
 *
 * This plugin:
 * 1. Scans for all `new PostgresStore()` instantiations
 * 2. Records their file locations
 * 3. Throws an error if multiple instances are found
 *
 * Cloudflare Workers should only create one PostgresStore instance to avoid connection
 * pool exhaustion and ensure proper resource management.
 *
 * @returns {PluginObj} A Babel plugin object that validates PostgresStore usage
 *
 * @example
 * // Throws error if multiple instances found:
 * const store1 = new PostgresStore();
 * const store2 = new PostgresStore(); // Error thrown here
 */
export declare function postgresStoreInstanceChecker(): PluginObj;
//# sourceMappingURL=postgres-store-instance-checker.d.ts.map