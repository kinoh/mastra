import { diag } from './chunk-32EQK4OY.js';
import { promises } from 'fs';

async function getMachineId() {
  const paths = ["/etc/machine-id", "/var/lib/dbus/machine-id"];
  for (const path of paths) {
    try {
      const result = await promises.readFile(path, { encoding: "utf8" });
      return result.trim();
    } catch (e) {
      diag.debug(`error reading machine id: ${e}`);
    }
  }
  return void 0;
}

export { getMachineId };
//# sourceMappingURL=getMachineId-linux-H4F4I7A5.js.map
//# sourceMappingURL=getMachineId-linux-H4F4I7A5.js.map