#!/usr/bin/env node

import { select } from '@clack/prompts';
import { createProject } from './workflows/createProjectWorkflow.js';

async function main() {
  const mode = await select({
    message: 'O que deseja fazer?',
    options: [
      { value: 'create', label: 'Criar novo projeto' },
    ],
  });

  if (mode === 'create') return createProject();

}

main();
