import { writeFile } from 'fs/promises';
import { join } from 'path';
import { Deployer } from '@mastra/deployer';
import virtual from '@rollup/plugin-virtual';
import * as babel from '@babel/core';
import { transformSync } from '@babel/core';

// src/index.ts
function mastraInstanceWrapper() {
  const exportName = "mastra";
  const className = "Mastra";
  const t = babel.types;
  return {
    name: "wrap-mastra",
    visitor: {
      ExportNamedDeclaration(path) {
        if (t.isVariableDeclaration(path.node?.declaration)) {
          for (const declaration of path.node.declaration.declarations) {
            if (t.isIdentifier(declaration?.id, { name: exportName }) && t.isNewExpression(declaration?.init) && t.isIdentifier(declaration.init.callee, { name: className })) {
              declaration.init = t.arrowFunctionExpression([], declaration.init);
              break;
            }
          }
        }
      }
    }
  };
}

// src/plugins/mastra-instance-wrapper.ts
function mastraInstanceWrapper2(mastraEntryFile) {
  return {
    name: "mastra-wrapper",
    transform(code, id) {
      if (id !== mastraEntryFile) {
        return null;
      }
      const result = transformSync(code, {
        filename: id,
        babelrc: false,
        configFile: false,
        plugins: [mastraInstanceWrapper]
      });
      if (!result?.code) {
        throw new Error("mastra-wrapper plugin did not return code, there is likely a bug in the plugin.");
      }
      return {
        code: result.code,
        map: result?.map
      };
    }
  };
}
function postgresStoreInstanceChecker() {
  const t = babel.types;
  const instances = [];
  return {
    name: "postgresstore-instance-checker",
    visitor: {
      NewExpression(path, state) {
        if (t.isIdentifier(path.node.callee) && path.node.callee.name === "PostgresStore") {
          const filename = state.file?.opts?.filename || "unknown file";
          const location = path.node.loc ? `${filename}: line ${path.node.loc.start.line}, column ${path.node.loc.start.column}` : "unknown location";
          instances.push({
            path,
            location
          });
        }
      }
    },
    post() {
      if (instances.length > 1) {
        const errorMessage = [
          `Found ${instances.length} PostgresStore instantiations:`,
          ...instances.map((instance, i) => `  ${i + 1}. At ${instance.location}`),
          "Only one PostgresStore instance should be created per Cloudflare Worker."
        ].join("\n");
        const lastInstance = instances[instances.length - 1];
        throw lastInstance?.path.buildCodeFrameError(errorMessage);
      }
    }
  };
}

// src/plugins/postgres-store-instance-checker.ts
function postgresStoreInstanceChecker2() {
  return {
    name: "postgres-store-instance-checker",
    transform(code, id) {
      const result = transformSync(code, {
        filename: id,
        babelrc: false,
        configFile: false,
        plugins: [postgresStoreInstanceChecker]
      });
      if (!result?.code) {
        throw new Error(
          "postgres-store-instance-checker plugin did not return code, there is likely a bug in the plugin."
        );
      }
      return {
        code: result.code,
        map: result?.map
      };
    }
  };
}

// src/index.ts
var CloudflareDeployer = class extends Deployer {
  routes = [];
  workerNamespace;
  env;
  projectName;
  d1Databases;
  kvNamespaces;
  constructor({
    env,
    projectName = "mastra",
    routes,
    workerNamespace,
    d1Databases,
    kvNamespaces
  }) {
    super({ name: "CLOUDFLARE" });
    this.projectName = projectName;
    this.routes = routes;
    this.workerNamespace = workerNamespace;
    if (env) {
      this.env = env;
    }
    if (d1Databases) this.d1Databases = d1Databases;
    if (kvNamespaces) this.kvNamespaces = kvNamespaces;
  }
  async writeFiles(outputDirectory) {
    const env = await this.loadEnvVars();
    const envsAsObject = Object.assign({}, Object.fromEntries(env.entries()), this.env);
    const cfWorkerName = this.projectName;
    const wranglerConfig = {
      name: cfWorkerName,
      main: "./index.mjs",
      compatibility_date: "2025-04-01",
      compatibility_flags: ["nodejs_compat", "nodejs_compat_populate_process_env"],
      observability: {
        logs: {
          enabled: true
        }
      },
      vars: envsAsObject
    };
    if (!this.workerNamespace && this.routes) {
      wranglerConfig.routes = this.routes;
    }
    if (this.d1Databases?.length) {
      wranglerConfig.d1_databases = this.d1Databases;
    }
    if (this.kvNamespaces?.length) {
      wranglerConfig.kv_namespaces = this.kvNamespaces;
    }
    await writeFile(join(outputDirectory, this.outputDir, "wrangler.json"), JSON.stringify(wranglerConfig));
  }
  getEntry() {
    return `
    import '#polyfills';
    import { mastra } from '#mastra';
    import { createHonoServer, getToolExports } from '#server';
    import { tools } from '#tools';
    import { evaluate } from '@mastra/core/eval';
    import { AvailableHooks, registerHook } from '@mastra/core/hooks';
    import { TABLE_EVALS } from '@mastra/core/storage';
    import { checkEvalStorageFields } from '@mastra/core/utils';

    export default {
      fetch: async (request, env, context) => {
        const _mastra = mastra();

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
          const storage = _mastra.getStorage();
          if (storage) {
            // Check for required fields
            const logger = _mastra?.getLogger();
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
      
        const app = await createHonoServer(_mastra, { tools: getToolExports(tools) });
        return app.fetch(request, env, context);
      }
    }
`;
  }
  async prepare(outputDirectory) {
    await super.prepare(outputDirectory);
    await this.writeFiles(outputDirectory);
  }
  async getBundlerOptions(serverFile, mastraEntryFile, analyzedBundleInfo, toolsPaths) {
    const inputOptions = await super.getBundlerOptions(serverFile, mastraEntryFile, analyzedBundleInfo, toolsPaths);
    if (Array.isArray(inputOptions.plugins)) {
      inputOptions.plugins = [
        virtual({
          "#polyfills": `
process.versions = process.versions || {};
process.versions.node = '${process.versions.node}';
      `
        }),
        ...inputOptions.plugins,
        postgresStoreInstanceChecker2(),
        mastraInstanceWrapper2(mastraEntryFile)
      ];
    }
    return inputOptions;
  }
  async bundle(entryFile, outputDirectory, toolsPaths) {
    return this._bundle(this.getEntry(), entryFile, outputDirectory, toolsPaths);
  }
  async deploy() {
    this.logger?.info("Deploying to Cloudflare failed. Please use the Cloudflare dashboard to deploy.");
  }
  async tagWorker() {
    throw new Error("tagWorker method is no longer supported. Use the Cloudflare dashboard or API directly.");
  }
  async lint(entryFile, outputDirectory, toolsPaths) {
    await super.lint(entryFile, outputDirectory, toolsPaths);
    const hasLibsql = await this.deps.checkDependencies(["@mastra/libsql"]) === `ok`;
    if (hasLibsql) {
      this.logger.error(
        "Cloudflare Deployer does not support @libsql/client(which may have been installed by @mastra/libsql) as a dependency. Please use Cloudflare D1 instead @mastra/cloudflare-d1"
      );
      process.exit(1);
    }
  }
};

export { CloudflareDeployer };
//# sourceMappingURL=index.js.map
//# sourceMappingURL=index.js.map