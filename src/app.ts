#!/usr/bin/env node

import {
  intro,
  outro,
  multiselect,
  select,
  text,
  spinner,
} from '@clack/prompts';
import { execSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { gitignore } from './core/defaultArchives/gitignore.js';
import { generate } from './core/paths/paths.js';
import { additionalFiles } from './core/adittionalFiles.js';
import { dependencesDB } from './core/settings/db/depencencesDB.js';

async function main() {
  intro('Criação de aplicação Node.Js 🚀');

  // Nome do projeto
  const projectName = await text({
    message: 'Qual o nome do projeto? (server)',
    defaultValue: 'server',
  });

  // Variante do projeto
  const projectVariant = await select({
    message: 'Escolha o tipo de projeto:',
    options: [
      { value: 'ts', label: 'TypeScript' },
      { value: 'js', label: 'JavaScript' },
    ],
  });

  // Forma de inicialização do npm
  const npmInit = await select({
    message: 'Escolha o tipo de inicialização do npm:',
    options: [
      { value: 'init', label: 'npm init' },
      { value: 'init -y', label: 'npm init -y' },
    ],
  });

  // Banco de dados
  const dbSetup = await select({
    message: 'Escolha o banco de dados:',
    options: [
      { value: 'mongodb', label: 'MongoDB' },
      { value: 'postgresql', label: 'PostgreSQL' },
      { value: 'supabase', label: 'Supabase' },
      { value: 'none', label: 'Nenhum' },
    ],
  });

  // Ferramentas adicionais
  const additionalTools = await multiselect({
    message: 'Escolha as ferramentas adicionais para o projeto:',
    options: [
      { value: 'eslint', label: 'ESLint', hint: 'recommended' },
      { value: 'prettier', label: 'Prettier' },
    ],
    required: false,
  });

  //Arquivos adicionais
  const additionalArchives = await multiselect({
    message: 'Escolha arquivos de configurações adicionais:',
    options: [
      { value: '.prettierrc.json', label: '.prettierrc.json' },
      { value: '.eslintrc.json', label: '.eslintrc.json' },
    ],
    required: false,
  });

  // Carregamento e criação do projeto
  const s = spinner();

  s.start('Construindo seu projeto...');

  // Criando pasta do projeto
  fs.mkdirSync(String(projectName), { recursive: true });
  process.chdir(String(projectName));

  //Criando pastas e arquivos do projeto
  const filePath = path.join(process.cwd(), '.gitignore');
  fs.writeFileSync(filePath, gitignore, 'utf8');

  //fazer criação de arquivos adicionais
  if ((additionalArchives as string[]).length > 0) {
    for (const fileName of additionalArchives as string[]) {
      if (additionalFiles[fileName]) {
        fs.writeFileSync(fileName, additionalFiles[fileName], 'utf8');
      }
    }
  }
  // Executando o comando de inicialização do npm
  execSync(`npm ${String(npmInit)}`, { stdio: 'ignore' });

  //Mudando para typ: module caso javascript
  if (projectVariant === 'js' || projectVariant === 'ts') {
    const packageJsonPath = path.join(process.cwd(), 'package.json');
    const packageData = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
    packageData.type = 'module';

    fs.writeFileSync(
      packageJsonPath,
      JSON.stringify(packageData, null, 2),
      'utf8',
    );
  }

  s.stop('Projeto inicializado');

  // Inicialização comum (sempre acontecerá)
  execSync(`npm install dotenv express jsonwebtoken cors`, { stdio: 'ignore' });

  // Dependências de bancos de dados
  dependencesDB(dbSetup, projectVariant);

  // Para ts
  if (projectVariant === 'ts') {
    execSync(
      `npm install typescript @types/node @types/jsonwebtoken @types/express @types/cors --save-dev`,
      { stdio: 'ignore' },
    );
    execSync(`npx tsc --init`, { stdio: 'ignore' });
  }

  //Instalando ferramentas
  if ((additionalTools as string[]).length > 0) {
    s.start('Instalando ferramentas adicionais...');
    execSync(`npm install -D ${(additionalTools as string[]).join(' ')}`, {
      stdio: 'inherit',
    });
    s.stop('Ferramentas instaladas :]');
  }

  //Criando pastas do código fonte
  generate(
    ['models', 'controllers', 'middlewares', 'services', 'routes', 'db'],
    projectVariant,
    dbSetup,
  );

  outro(`Tudo pronto ✅`);
}

main();
