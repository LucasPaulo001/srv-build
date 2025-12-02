import { execSync } from 'node:child_process';

export const dependencesDB = (
  variantDB: Symbol | 'mongodb' | 'postgresql' | 'supabase' | 'none',
  variant: Symbol | 'ts' | 'js',
) => {
  switch (variantDB) {
    case 'mongodb':
      execSync(`npm install mongoose`, { stdio: 'ignore' });

      break;

    case 'postgresql':
      execSync(`npm install pg`, { stdio: 'ignore' });

      if (variant === 'ts') {
        execSync(`npm install @types/pg -D`, { stdio: 'ignore' });
      }

      break;

    case 'supabase':
      execSync(`npm install @supabase/supabase-js`, { stdio: 'inherit' });
      break;
  }
};
