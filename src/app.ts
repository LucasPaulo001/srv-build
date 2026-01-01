#!/usr/bin/env node

import { select } from '@clack/prompts';
import { createProject } from './workflows/createProjectWorkflow.js';
import { UpdateProject } from './workflows/updateProjectWorkflow.js';

async function main() {
  const mode = await select({
    message: 'O que deseja fazer?',
    options: [
      { value: 'create', label: 'Criar novo projeto' },
      { value: 'update', label: 'Atualizar projeto existente' },
    ],
  });

  if (mode === 'create') return createProject();

  if (mode === 'update') return UpdateProject();

}

main();
