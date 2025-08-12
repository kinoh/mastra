import type { LLMProvider } from '../init/utils.js';
export declare const create: (args: {
    projectName?: string;
    components?: string[];
    llmProvider?: LLMProvider;
    addExample?: boolean;
    llmApiKey?: string;
    createVersionTag?: string;
    timeout?: number;
    directory?: string;
    mcpServer?: "windsurf" | "cursor" | "cursor-global";
    template?: string | boolean;
}) => Promise<void>;
//# sourceMappingURL=create.d.ts.map