import { ORM } from "../create/setupDB.js";
import { mongooseCode, pgDefaultCode, prismaCode, sequelizeCode, supabaseCode } from "./dbCode.js";

export const dbGenerate = (
  dbVariant: symbol | 'mongodb' | 'postgresql' | 'supabase' | 'none',
  variant: symbol | 'ts' | 'js',
  orm: ORM
): string => {
  switch (dbVariant) {
    case 'mongodb':
      return mongooseCode(variant);

    case 'postgresql':

      switch(orm) {
        case "prisma":
          return prismaCode();

        case "sequelize":
          return sequelizeCode();

        case "none":
          return pgDefaultCode();
      
      }
    ;

    case 'supabase':
      return supabaseCode();

    default:
      return `// Banco desconhecido`;
  }
};