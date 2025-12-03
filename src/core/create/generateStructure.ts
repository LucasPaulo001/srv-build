import { generate } from "../paths/path.js";
import { ORM } from "./setupDB.js";

export function generateProjectStructure(
  variant: symbol | 'ts' | 'js',
  dbSetup: symbol | 'mongodb' | 'postgresql' | 'supabase' | 'none',
  orm: ORM
) {
  generate(
    ['models', 'controllers', 'middlewares', 'services', 'routes', 'db'],
    variant,
    dbSetup,
    orm
  );
}
