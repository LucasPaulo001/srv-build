import { execSync } from "child_process";

export function installAdditionalTools(tools: string[]) {
  if (!tools.length) return;

  execSync(`npm install -D ${tools.join(" ")}`, { stdio: "inherit" });
}
