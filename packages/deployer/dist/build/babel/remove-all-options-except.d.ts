import babel from '@babel/core';
import type { IMastraLogger } from '@mastra/core/logger';
export declare function removeAllOptionsFromMastraExcept(result: {
    hasCustomConfig: boolean;
}, option: 'telemetry' | 'server' | 'bundler', logger?: IMastraLogger): babel.PluginObj;
//# sourceMappingURL=remove-all-options-except.d.ts.map