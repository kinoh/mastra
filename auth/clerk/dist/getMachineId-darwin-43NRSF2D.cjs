'use strict';

var chunkUYPX6MT6_cjs = require('./chunk-UYPX6MT6.cjs');
var chunkB2N25K77_cjs = require('./chunk-B2N25K77.cjs');

// ../../node_modules/.pnpm/@opentelemetry+resources@2.0.1_@opentelemetry+api@1.9.0/node_modules/@opentelemetry/resources/build/esm/detectors/platform/node/machine-id/getMachineId-darwin.js
async function getMachineId() {
  try {
    const result = await chunkUYPX6MT6_cjs.execAsync('ioreg -rd1 -c "IOPlatformExpertDevice"');
    const idLine = result.stdout.split("\n").find((line) => line.includes("IOPlatformUUID"));
    if (!idLine) {
      return void 0;
    }
    const parts = idLine.split('" = "');
    if (parts.length === 2) {
      return parts[1].slice(0, -1);
    }
  } catch (e) {
    chunkB2N25K77_cjs.diag.debug(`error reading machine id: ${e}`);
  }
  return void 0;
}

exports.getMachineId = getMachineId;
//# sourceMappingURL=getMachineId-darwin-43NRSF2D.cjs.map
//# sourceMappingURL=getMachineId-darwin-43NRSF2D.cjs.map