'use strict';

var chunkB2N25K77_cjs = require('./chunk-B2N25K77.cjs');
var fs = require('fs');

async function getMachineId() {
  const paths = ["/etc/machine-id", "/var/lib/dbus/machine-id"];
  for (const path of paths) {
    try {
      const result = await fs.promises.readFile(path, { encoding: "utf8" });
      return result.trim();
    } catch (e) {
      chunkB2N25K77_cjs.diag.debug(`error reading machine id: ${e}`);
    }
  }
  return void 0;
}

exports.getMachineId = getMachineId;
//# sourceMappingURL=getMachineId-linux-TZ3NOAZ5.cjs.map
//# sourceMappingURL=getMachineId-linux-TZ3NOAZ5.cjs.map