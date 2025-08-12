import type { PluginObj } from '@babel/core';
/**
 * Babel plugin that transforms Mastra exports for Cloudflare Workers compatibility.
 *
 * This plugin:
 * 1. Identifies named exports of the 'mastra' variable
 * 2. Checks if the export is a new instance of the 'Mastra' class
 * 3. Wraps the Mastra instantiation in an arrow function to ensure proper initialization
 *    in the Cloudflare Workers environment
 *
 * The transformation ensures the Mastra instance is properly scoped and initialized
 * for each request in the Cloudflare Workers environment.
 *
 * @returns {PluginObj} A Babel plugin object with a visitor that performs the transformation
 *
 * @example
 * // Before transformation:
 * export const mastra = new Mastra();
 *
 * // After transformation:
 * export const mastra = () => new Mastra();
 */
export declare function mastraInstanceWrapper(): PluginObj;
//# sourceMappingURL=mastra-instance-wrapper.d.ts.map