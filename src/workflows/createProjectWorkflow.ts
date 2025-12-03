import {
  intro,
  outro,
  multiselect,
  select,
  text,
  spinner,
} from '@clack/prompts';

import { gitignore } from '../core/defaultArchives/gitignore.js';
import { additionalFiles } from '../core/adittionalFiles.js';
import { contentEnv } from '../core/defaultArchives/env.js';

import {
  createProjectFolder,
  writeGitignore,
  writeAdditionalFiles,
} from '../core/create/createProject.js';
import { initNpm, forceModuleType } from '../core/create/initNPM.js';
import {
  installBaseDependencies,
  setupTypescript,
} from '../core/create/setupBaseDeps.js';
import { dependencesDB, ORM } from '../core/create/setupDB.js';
import { installAdditionalTools } from '../core/create/setupTools.js';
import { generateProjectStructure } from '../core/create/generateStructure.js';
import { writeEnv } from '../core/create/generateEnv.js';
import { orm } from '../core/settings/ormGenerate.js';

export async function createProject() {
  intro('Criação de aplicação Node.Js 🚀');

  const projectName = await text({
    message: 'Qual o nome do projeto?',
    defaultValue: 'server',
  });

  const projectVariant = await select({
    message: 'Escolha o tipo de projeto:',
    options: [
      { value: 'ts', label: 'TypeScript' },
      { value: 'js', label: 'JavaScript' },
    ],
  });

  const npmInit = await select({
    message: 'Escolha o tipo de inicialização do npm:',
    options: [
      { value: 'init', label: 'npm init' },
      { value: 'init -y', label: 'npm init -y' },
    ],
  });

  const additionalTools = await multiselect({
    message: 'Ferramentas adicionais:',
    options: [
      { value: 'eslint', label: 'ESLint', hint: 'recommended' },
      { value: 'prettier', label: 'Prettier' },
    ],
    required: false,
  });

  const additionalArchives = await multiselect({
    message: 'Arquivos adicionais:',
    options: [
      { value: '.prettierrc.json', label: '.prettierrc.json' },
      { value: '.eslintrc.json', label: '.eslintrc.json' },
    ],
    required: false,
  });

  // Criando pasta raiz
  createProjectFolder(String(projectName));

  process.chdir(String(projectName));

  // Criando .gitignore
  writeGitignore(gitignore);

  // Criando arquivos adicionais (.prettierrc.json / .eslintrc.json)
  writeAdditionalFiles(additionalArchives as string[], additionalFiles);

  // Inicializar npm
  initNpm(String(npmInit));

  // Definir type: module
  forceModuleType();

  const dbSetup = await select({
    message: 'Escolha o banco de dados:',
    options: [
      { value: 'mongodb', label: 'MongoDB' },
      { value: 'postgresql', label: 'PostgreSQL' },
      { value: 'supabase', label: 'Supabase' },
      { value: 'none', label: 'Nenhum' },
    ],
  });

  // Dependências do banco cos ORMs
  const selectedORM = await orm(dbSetup);

  intro("Aguarde...");
  dependencesDB(dbSetup, projectVariant, selectedORM);

  // Criar .env
  writeEnv(contentEnv);

  // Dependências padrão (express, dotenv...)
  installBaseDependencies();

  // Se TypeScript instalar deps + tsconfig
  if (projectVariant === 'ts') {
    setupTypescript();
  }

  // Instalar ferramentas adicionais (ESLint / Prettier)
  if ((additionalTools as string[]).length > 0) {
    installAdditionalTools(additionalTools as string[]);
  }

  // Criar src, controllers, routes, dbConnect etc.
  generateProjectStructure(projectVariant, dbSetup, selectedORM);



  outro('Tudo pronto! 🚀');
}
