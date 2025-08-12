import { Agent } from '@mastra/core/agent';
import type { LanguageModel } from '@mastra/core/llm';
export declare abstract class MastraAgentJudge {
    protected readonly agent: Agent;
    constructor(name: string, instructions: string, model: LanguageModel);
}
//# sourceMappingURL=index.d.ts.map