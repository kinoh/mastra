import type { ServerEntry } from './types.js';
/**
 * Fetches servers from a registry's servers_url endpoint
 */
export declare function fetchServersFromRegistry(registryId: string): Promise<ServerEntry[]>;
/**
 * Filters server entries based on provided criteria
 */
export declare function filterServers(servers: ServerEntry[], filters: {
    tag?: string;
    search?: string;
}): ServerEntry[];
/**
 * Main function to get servers from a registry with optional filtering
 */
export declare function getServersFromRegistry(registryId: string, filters?: {
    tag?: string;
    search?: string;
}): Promise<any>;
//# sourceMappingURL=fetch-servers.d.ts.map