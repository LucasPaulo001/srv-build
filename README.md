# srv-build
## Gerador de Estrutura de Projeto CLI
Esta aplicação CLI automatiza a criação da estrutura inicial de um projeto backend em Node.js, com suporte para TypeScript (.ts) ou JavaScript (.js). Ela cria pastas padrão, arquivos essenciais (ex: .env, rotas, serviços de e-mail) e facilita o setup inicial do projeto.

## Funcionalidades
- Criação automática da pasta src

- Geração de subpastas como routes e services

- Criação do arquivo .env na raiz do projeto

- Geração de arquivos iniciais para rotas e configuração de serviço de e-mail

- Suporte para variantes .ts (TypeScript) ou .js (JavaScript)

- Estrutura pronta para desenvolvimento backend

## Configuração
- O arquivo .env será criado automaticamente na raiz do projeto com o conteúdo padrão.

- Arquivos de rota e serviço serão gerados com base na extensão informada.

- Você pode modificar os templates de arquivo dentro da pasta content para ajustar ao seu padrão.

## Tecnologias
- Node.js (v16+)

- TypeScript

- fs (filesystem) do Node

- Path do Node
- CLI personalizado com o ``Clack``
