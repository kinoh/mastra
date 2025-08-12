'use strict';

var chunkUYPX6MT6_cjs = require('./chunk-UYPX6MT6.cjs');
var chunkB2N25K77_cjs = require('./chunk-B2N25K77.cjs');
var process = require('process');

function _interopNamespace(e) {
  if (e && e.__esModule) return e;
  var n = Object.create(null);
  if (e) {
    Object.keys(e).forEach(function (k) {
      if (k !== 'default') {
        var d = Object.getOwnPropertyDescriptor(e, k);
        Object.defineProperty(n, k, d.get ? d : {
          enumerable: true,
          get: function () { return e[k]; }
        });
      }
    });
  }
  n.default = e;
  return Object.freeze(n);
}

var process__namespace = /*#__PURE__*/_interopNamespace(process);

async function getMachineId() {
  const args = "QUERY HKEY_LOCAL_MACHINE\\SOFTWARE\\Microsoft\\Cryptography /v MachineGuid";
  let command = "%windir%\\System32\\REG.exe";
  if (process__namespace.arch === "ia32" && "PROCESSOR_ARCHITEW6432" in process__namespace.env) {
    command = "%windir%\\sysnative\\cmd.exe /c " + command;
  }
  try {
    const result = await chunkUYPX6MT6_cjs.execAsync(`${command} ${args}`);
    const parts = result.stdout.split("REG_SZ");
    if (parts.length === 2) {
      return parts[1].trim();
    }
  } catch (e) {
    chunkB2N25K77_cjs.diag.debug(`error reading machine id: ${e}`);
  }
  return void 0;
}

exports.getMachineId = getMachineId;
//# sourceMappingURL=getMachineId-win-B5AEGZT7.cjs.map
//# sourceMappingURL=getMachineId-win-B5AEGZT7.cjs.map