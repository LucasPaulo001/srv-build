import { execSync } from "child_process";

export function installBaseDependencies() {
  execSync(`npm install dotenv express jsonwebtoken cors`, { stdio: "ignore" });
}

export function setupTypescript() {
  execSync(
    `npm install typescript @types/node @types/jsonwebtoken @types/express @types/cors --save-dev`,
    { stdio: "ignore" }
  );

  execSync(`npx tsc --init`, { stdio: "ignore" });
}
