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

export async function generate(
  folders: string[],
  variant: symbol | "js" | "ts",
  dbSetup: symbol | "mongodb" | "postgresql" | "supabase" | "none",
  orm: ORM,
  projectArchiteture: symbol | "mvc" | "modules" | undefined,
  entitiesInput: string | symbol,
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
    process.chdir(srcDir);
    index(String(variant));

    if (projectArchiteture === "mvc") {
      // 4. Criar pastas especificadas se caso for mvc
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
    }

    const entities = String(entitiesInput)
      .split(",")
      .map((e: string) => e.trim())
      .filter(Boolean);


    if (projectArchiteture === "modules") {
      const modulesDir = path.join(srcDir, "modules");
      const sharedDir = path.join(srcDir, "shared");

      fs.mkdirSync(modulesDir, { recursive: true });
      fs.mkdirSync(sharedDir, { recursive: true });

      fs.mkdirSync(path.join(sharedDir, "middlewares"), { recursive: true });
      fs.mkdirSync(path.join(sharedDir, "utils"), { recursive: true });

      // db compartilhado
      const dbDir = path.join(srcDir, "db");
      fs.mkdirSync(dbDir, { recursive: true });
      generateArchive(
        path.join(dbDir, `dbConnect.${String(variant)}`),
        dbGenerate(dbSetup, variant, orm)
      );

      for (const entity of entities) {
        const entityDir = path.join(modulesDir, entity);
        fs.mkdirSync(entityDir, { recursive: true });

        generateArchive(
          path.join(entityDir, `${entity}.controller.${String(variant)}`),
          `export class ${capitalize(entity)}Controller {}`
        );

        generateArchive(
          path.join(entityDir, `${entity}.service.${String(variant)}`),
          `export class ${capitalize(entity)}Service {}`
        );

        generateArchive(
          path.join(entityDir, `${entity}.routes.${String(variant)}`),
          generateRouter(String(variant))
        );

        if (dbSetup !== "none") {
          generateArchive(
            path.join(entityDir, `${entity}.model.${String(variant)}`),
            "// schema / model"
          );
        }
      }
    }


  } catch (err) {
    console.error(err);
  }
}


function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
