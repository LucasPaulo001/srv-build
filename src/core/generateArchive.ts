import fs from 'node:fs';

//Função para gerar arquivos
export const generateArchive = (filePath: string, content: string) => {
  fs.writeFileSync(filePath, content, 'utf8');
};
