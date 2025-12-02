import fs from 'node:fs';
import path from 'path';
import { index } from '../defaultArchives/index.js';
import { contentEnv } from '../defaultArchives/env.js';
import { generateArchive } from '../generateArchive.js';
import { generateRouter } from '../routesContent.js';
import { jwtDefault } from '../settings/jwtGenerate.js';
import { dbGenerate } from '../settings/db/dbGenerate.js';
import { envDB } from '../settings/db/envDB.js';

export const generate = (
  pathName: string[],
  variant: symbol | 'js' | 'ts',
  dbSetup: symbol | 'mongodb' | 'postgresql' | 'supabase' | 'none',
) => {
  try {
    const baseDir = process.cwd();

    // Cria arquivo .env na raiz
    const filePath = path.join(baseDir, '.env');
    const envFinal = contentEnv + '\n' + envDB(dbSetup);

    fs.writeFileSync(filePath, envFinal, 'utf8');

    // Cria pasta src na raiz
    const srcDir = path.join(baseDir, 'src');
    fs.mkdirSync(srcDir, { recursive: true });

    // Executa index (passando o srcDir se necessário)
    process.chdir(srcDir);
    index(String(variant));

    // Cria as pastas dentro de src sem mudar o cwd
    for (const folder of pathName) {
      const folderPath = path.join(srcDir, folder);
      fs.mkdirSync(folderPath, { recursive: true });

      if (folder === 'routes') {
        const fileRoute = path.join(folderPath, `routes.${String(variant)}`);
        generateArchive(fileRoute, generateRouter(String(variant)));
      }

      if (folder === 'middlewares') {
        const fileJWT = path.join(folderPath, `jwt.${String(variant)}`);
        generateArchive(fileJWT, jwtDefault(variant));
      }

      if (folder === 'db') {
        const fileDB = path.join(folderPath, `dbConnect.${String(variant)}`);
        generateArchive(fileDB, dbGenerate(dbSetup, variant));
      }
    }
  } catch (err) {
    console.error(err);
  }
};
