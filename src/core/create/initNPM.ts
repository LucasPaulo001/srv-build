import { execSync } from "child_process";
import fs from "fs";

export function initNpm(npmInit: string) {
  execSync(`npm ${npmInit}`, { stdio: "ignore" });
}

export function forceModuleType() {
  const pkg = JSON.parse(fs.readFileSync("package.json", "utf8"));
  pkg.type = "module";
  fs.writeFileSync("package.json", JSON.stringify(pkg, null, 2));
}
