import { execAsync } from './chunk-G7ML3FDV.js';
import { diag } from './chunk-32EQK4OY.js';
import { promises } from 'fs';

async function getMachineId() {
  try {
    const result = await promises.readFile("/etc/hostid", { encoding: "utf8" });
    return result.trim();
  } catch (e) {
    diag.debug(`error reading machine id: ${e}`);
  }
  try {
    const result = await execAsync("kenv -q smbios.system.uuid");
    return result.stdout.trim();
  } catch (e) {
    diag.debug(`error reading machine id: ${e}`);
  }
  return void 0;
}

export { getMachineId };
//# sourceMappingURL=getMachineId-bsd-G4THBH3V.js.map
//# sourceMappingURL=getMachineId-bsd-G4THBH3V.js.map