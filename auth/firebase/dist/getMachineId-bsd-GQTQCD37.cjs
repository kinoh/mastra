'use strict';

var chunkUYPX6MT6_cjs = require('./chunk-UYPX6MT6.cjs');
var chunkB2N25K77_cjs = require('./chunk-B2N25K77.cjs');
var fs = require('fs');

async function getMachineId() {
  try {
    const result = await fs.promises.readFile("/etc/hostid", { encoding: "utf8" });
    return result.trim();
  } catch (e) {
    chunkB2N25K77_cjs.diag.debug(`error reading machine id: ${e}`);
  }
  try {
    const result = await chunkUYPX6MT6_cjs.execAsync("kenv -q smbios.system.uuid");
    return result.stdout.trim();
  } catch (e) {
    chunkB2N25K77_cjs.diag.debug(`error reading machine id: ${e}`);
  }
  return void 0;
}

exports.getMachineId = getMachineId;
//# sourceMappingURL=getMachineId-bsd-GQTQCD37.cjs.map
//# sourceMappingURL=getMachineId-bsd-GQTQCD37.cjs.map