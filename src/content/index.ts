import path from "path";
import fs from "node:fs";

export const index = async (archiveType: string) => {
    try{
        const server = `
import express from "express";
import dotenv from "dotenv";
dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}))


//Iniciando o servidor
const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log('Conectado ao servidor...');
});
`
        const filePath = path.join(process.cwd(), `index.${archiveType}`);
        fs.writeFileSync(filePath, server, "utf8");
    }
    catch(err){
        console.error(err);
    }
}