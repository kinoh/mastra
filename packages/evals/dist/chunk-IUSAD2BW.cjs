'use strict';

var agent = require('@mastra/core/agent');

// src/metrics/judge/index.ts
var MastraAgentJudge = class {
  agent;
  constructor(name, instructions, model) {
    this.agent = new agent.Agent({
      name: `Mastra Eval Judge ${name}`,
      instructions,
      model
    });
  }
};

exports.MastraAgentJudge = MastraAgentJudge;
//# sourceMappingURL=chunk-IUSAD2BW.cjs.map
//# sourceMappingURL=chunk-IUSAD2BW.cjs.map