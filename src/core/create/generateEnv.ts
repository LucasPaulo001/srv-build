import fs from "fs";

export function writeEnv(contentEnv: string) {
  fs.writeFileSync(".env", contentEnv, "utf8");
}
