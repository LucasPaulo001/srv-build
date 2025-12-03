export function mongooseCode(variant: symbol | 'ts' | 'js') {
  return `
import mongoose from 'mongoose';

export const dbConnect = async () => {
  const MONGO_URI = process.env.MONGO_URI;
  try {
    ${
      variant === 'ts'
        ? `
    if (!MONGO_URI) {
      console.log("URL de conexão com o MongoDB inválida.");
      return;
    }
  `
        : ''
    }
    await mongoose.connect(MONGO_URI);
    console.log('MongoDB conectado com sucesso!');
  } catch (err) {
    console.error('Erro ao conectar ao MongoDB:', err);
  }
};
      `;
}

export function prismaCode() {
  return `
import { PrismaClient } from "@prisma/client/extension";

export const prisma = new PrismaClient();

export async function dbConnect() {
  try {
    await prisma.$connect();
    console.log("Conectado ao PostgreSQL via Prisma!");
  } catch (err) {
    console.error("Erro ao conectar com Prisma:", err);
  }
}
    
    `;
}

export function sequelizeCode() {
  return `

import { Sequelize } from "sequelize";

const DATABASE_URL = process.env.DATABASE_URL;

export const sequelize = new Sequelize(DATABASE_URL!, {
  dialect: "postgres",
  logging: false,
});

export async function dbConnect() {
  try {
    await sequelize.authenticate();
    console.log("PostgreSQL conectado via Sequelize!");
  } catch (err) {
    console.error("Erro ao conectar com Sequelize:", err);
  }
}
    `;
}

export function pgDefaultCode() {
  return `
import { Client } from 'pg';

const client = new Client({
  connectionString: process.env.DATABASE_URL,
});

export const dbConnect = async () => {
  try {
    await client.connect();
    console.log('PostgreSQL conectado!');
  } catch (err) {
    console.error('Erro ao conectar ao PostgreSQL:', err);
  }
};

    `;
}

export function supabaseCode() {
  return `
import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);
      `;
}
