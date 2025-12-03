import fs from "node:fs";
import path from "path";
import { contentEnv } from "../defaultArchives/env.js";
import { generateArchive } from "../generateArchive.js";
import { generateRouter } from "../routesContent.js";
import { jwtDefault } from "../defaultArchives/jwtDefault.js";
import { dbGenerate } from "../settings/dbGenerate.js";
import { envDB } from "../settings/envDB.js";
import { index } from "../defaultArchives/index.js";
import { ORM } from "../create/setupDB.js";

export function generate(
  folders: string[],
  variant: symbol | "js" | "ts",
  dbSetup: symbol | "mongodb" | "postgresql" | "supabase" | "none",
  orm: ORM
) {
  try {
    const baseDir = process.cwd();

    // 1. Criar .env
    const fileEnv = path.join(baseDir, ".env");
    const envFinal = contentEnv + "\n" + envDB(dbSetup);
    fs.writeFileSync(fileEnv, envFinal, "utf8");

    // 2. Criar src/
    const srcDir = path.join(baseDir, "src");
    fs.mkdirSync(srcDir, { recursive: true });

    // 3. Gerar index.ts / index.js
    process.chdir(srcDir); // mantém seu comportamento atual
    index(String(variant));

    // 4. Criar pastas especificadas
    for (const folder of folders) {
      const folderPath = path.join(srcDir, folder);
      fs.mkdirSync(folderPath, { recursive: true });

      if (folder === "routes") {
        const fileRoute = path.join(folderPath, `routes.${String(variant)}`);
        generateArchive(fileRoute, generateRouter(String(variant)));
      }

      if (folder === "middlewares") {
        const fileJWT = path.join(folderPath, `jwt.${String(variant)}`);
        generateArchive(fileJWT, jwtDefault(variant));
      }

      if (folder === "db") {
        const fileDB = path.join(folderPath, `dbConnect.${String(variant)}`);
        generateArchive(fileDB, dbGenerate(dbSetup, variant, orm));
      }
    }
  } catch (err) {
    console.error(err);
  }
}
