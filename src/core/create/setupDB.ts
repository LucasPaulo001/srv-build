import { execSync } from 'node:child_process';

export type Database = symbol | "mongodb" | "postgresql" | "supabase" | "none";
export type ORM = symbol | "mongoose" | "prisma" | "sequelize" | "none" | "supabase-client";
export type Variant = symbol | "js" | "ts";

export const dependencesDB = (
  variantDB: Database,
  variant: Variant,
  orm: ORM,
) => {

  switch (variantDB) {
    case 'mongodb':
      if (orm === 'mongoose') {
        execSync(`npm install mongoose`, { stdio: 'ignore' });
      }

      break;

    case 'postgresql':
      if (orm === 'prisma') {

        execSync(`npm install prisma @prisma/client`);
        execSync(`npx prisma init`);

      } 
      else if (orm === 'sequelize') {

        execSync(`npm install sequelize pg pg-hstore`);

      } 
      else {
        execSync(`npm install pg`, { stdio: 'ignore' });

        if (variant === 'ts') {
          execSync(`npm install @types/pg -D`, { stdio: 'ignore' });
        }
      }

      break;

    case 'supabase':
      execSync(`npm install @supabase/supabase-js`, { stdio: 'inherit' });
      break;
  }
};
