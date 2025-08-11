import fs from "node:fs";
import path from "path";
import { index } from "../content/index.js";
import { contentEnv } from "../content/env.js";
import { generateArchive } from "../content/generateArchive.js";
import { generateRouter } from "../content/routesContent.js";
import { generateConfigMail } from "../content/adittionalFiles.js";

export const generate = (pathName: string[], variant: string) => {
  try {
    const baseDir = process.cwd();

    // Cria arquivo .env na raiz
    const filePath = path.join(baseDir, ".env");
    fs.writeFileSync(filePath, contentEnv, "utf8");

    // Cria pasta src na raiz
    const srcDir = path.join(baseDir, "src");
    fs.mkdirSync(srcDir, { recursive: true });

    // Executa index (passando o srcDir se necessário)
    process.chdir(srcDir);
    index(String(variant));

    // Cria as pastas dentro de src sem mudar o cwd
    for (const folder of pathName) {
      const folderPath = path.join(srcDir, folder);
      fs.mkdirSync(folderPath, { recursive: true });

      if (folder === "routes") {
        const fileRoute = path.join(folderPath, `routes.${variant}`);
        generateArchive(fileRoute, generateRouter(variant));
      }

      if (folder === "services") {
        const fileService = path.join(folderPath, `sendMail.${variant}`);
        generateArchive(fileService, generateConfigMail(variant));
      }
    }
  } catch (err) {
    console.error(err);
  }
};
