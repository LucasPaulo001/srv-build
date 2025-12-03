import path from 'path';
import fs from 'node:fs';

export const index = async (archiveType: string) => {
  try {
    const server = `
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();

//Rotas
import router from "./routes/routes.js";

const app = express();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(router);

//Iniciando o servidor
const PORT = process.env.PORT;
app.listen(PORT || 8080, () => {
    console.log('Conectado ao servidor na porta:', PORT);
});
`;
    const filePath = path.join(process.cwd(), `index.${archiveType}`);
    fs.writeFileSync(filePath, server, 'utf8');
  } catch (err) {
    console.error(err);
  }
};