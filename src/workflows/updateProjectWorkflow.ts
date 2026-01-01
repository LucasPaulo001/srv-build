import { intro, isCancel, note, select, spinner } from "@clack/prompts";
import fs from "fs-extra"
import path from "node:path";
import { mongooseCode, sequelizeCode } from "../core/settings/dbCode.js";

export async function UpdateProject() {
    intro("Atualização de projeto");

    const updates = await select({
        message: 'O que deseja atualizar?: (esteja no diretório "src" do projeto)',
        options: [
            { value: 'database', label: 'Banco de dados' },
        ],
    });


    if (updates === "database") UpdateDatabase();

}


async function UpdateDatabase() {

    const newDatabase = await select({
        message: 'Escolha o banco de dados:',
        options: [
            { value: 'mongodb', label: 'MongoDB' },
            { value: 'postgresql', label: 'PostgreSQL' },
            { value: 'supabase', label: 'Supabase' },
            { value: 'none', label: 'Nenhum' },
        ],
    });

    if(isCancel(newDatabase)) return;

    const s = spinner();

    s.start("Atualizando configurações do projeto...");

    const projectRoot = process.cwd();

    const configPath = path.join(projectRoot, "src", "config", "database.ts");

    const templates = {
        mongodb: mongooseCode("ts"),
        postgresql: sequelizeCode()
    }

    try{
        await fs.ensureDir(path.dirname(configPath));

        await fs.writeFile(configPath, templates[newDatabase as keyof typeof templates])
    const envPath = path.join(projectRoot, ".env");
        if (await fs.pathExists(envPath)) {
            await fs.appendFile(envPath, `\nDATABASE_TYPE=${newDatabase}`);
        }

        s.stop(`Sucesso: Projeto atualizado para ${newDatabase}!`);
        
        note(
            `Arquivo modificado: src/config/database.ts\nDependências sugeridas: npm install ${newDatabase === 'mongodb' ? 'mongoose' : 'pg'}`,
            'Próximos passos'
        );

    } catch (err) {
        s.stop("Erro ao atualizar arquivos.");
        console.error(err);
    }
}