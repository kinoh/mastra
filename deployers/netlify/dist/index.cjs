'use strict';

var path = require('path');
var process = require('process');
var deployer = require('@mastra/deployer');
var services = require('@mastra/deployer/services');
var esm = require('fs-extra/esm');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var process__default = /*#__PURE__*/_interopDefault(process);

// src/index.ts
var NetlifyDeployer = class extends deployer.Deployer {
  constructor() {
    super({ name: "NETLIFY" });
    this.outputDir = path.join(".netlify", "v1", "functions", "api");
  }
  async installDependencies(outputDirectory, rootDir = process__default.default.cwd()) {
    const deps = new services.DepsService(rootDir);
    deps.__setLogger(this.logger);
    await deps.install({
      dir: path.join(outputDirectory, this.outputDir),
      architecture: {
        os: ["linux"],
        cpu: ["x64"],
        libc: ["gnu"]
      }
    });
  }
  async deploy() {
    this.logger?.info("Deploying to Netlify failed. Please use the Netlify dashboard to deploy.");
  }
  async prepare(outputDirectory) {
    await super.prepare(outputDirectory);
  }
  async bundle(entryFile, outputDirectory, toolsPaths) {
    const result = await this._bundle(
      this.getEntry(),
      entryFile,
      outputDirectory,
      toolsPaths,
      path.join(outputDirectory, this.outputDir)
    );
    await esm.writeJson(path.join(outputDirectory, ".netlify", "v1", "config.json"), {
      redirects: [
        {
          force: true,
          from: "/*",
          to: "/.netlify/functions/api/:splat",
          status: 200
        }
      ]
    });
    await esm.move(path.join(outputDirectory, ".netlify", "v1"), path.join(process__default.default.cwd(), ".netlify", "v1"), {
      overwrite: true
    });
    return result;
  }
  getEntry() {
    return `
    import { handle } from 'hono/netlify'
    import { mastra } from '#mastra';
    import { createHonoServer, getToolExports } from '#server';
    import { tools } from '#tools';
    import { evaluate } from '@mastra/core/eval';
    import { AvailableHooks, registerHook } from '@mastra/core/hooks';
    import { TABLE_EVALS } from '@mastra/core/storage';
    import { checkEvalStorageFields } from '@mastra/core/utils';

    registerHook(AvailableHooks.ON_GENERATION, ({ input, output, metric, runId, agentName, instructions }) => {
      evaluate({
        agentName,
        input,
        metric,
        output,
        runId,
        globalRunId: runId,
        instructions,
      });
    });

    registerHook(AvailableHooks.ON_EVALUATION, async traceObject => {
      const storage = mastra.getStorage();
      if (storage) {
        // Check for required fields
        const logger = mastra.getLogger();
        const areFieldsValid = checkEvalStorageFields(traceObject, logger);
        if (!areFieldsValid) return;

        await storage.insert({
          tableName: TABLE_EVALS,
          record: {
            input: traceObject.input,
            output: traceObject.output,
            result: JSON.stringify(traceObject.result || {}),
            agent_name: traceObject.agentName,
            metric_name: traceObject.metricName,
            instructions: traceObject.instructions,
            test_info: null,
            global_run_id: traceObject.globalRunId,
            run_id: traceObject.runId,
            created_at: new Date().toISOString(),
          },
        });
      }
    });

    const app = await createHonoServer(mastra, { tools: getToolExports(tools) });

    export default handle(app)
`;
  }
  async lint(entryFile, outputDirectory, toolsPaths) {
    await super.lint(entryFile, outputDirectory, toolsPaths);
  }
};

exports.NetlifyDeployer = NetlifyDeployer;
//# sourceMappingURL=index.cjs.map
//# sourceMappingURL=index.cjs.map