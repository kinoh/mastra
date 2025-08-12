import type { RegistryEntry, RegistryFile } from './types.js';
/**
 * Returns the registry data from the registry.ts file
 */
export declare function loadRegistryData(): Promise<RegistryFile>;
/**
 * Filters registry entries based on provided criteria
 */
export declare function filterRegistries(registries: RegistryEntry[], filters: {
    id?: string;
    tag?: string;
    name?: string;
}): RegistryEntry[];
/**
 * Formats registry entries for API response
 */
export declare function formatRegistryResponse(registries: RegistryEntry[], detailed?: boolean): any;
/**
 * Main function to get registry listings with optional filtering
 */
export declare function getRegistryListings(filters?: {
    id?: string;
    tag?: string;
    name?: string;
}, options?: {
    detailed?: boolean;
}): Promise<any>;
//# sourceMappingURL=list-registries.d.ts.map