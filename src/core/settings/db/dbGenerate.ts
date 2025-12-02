export const dbGenerate = (
  dbVariant: symbol | 'mongodb' | 'postgresql' | 'supabase' | 'none',
  variant: symbol | 'ts' | 'js',
): string => {
  switch (dbVariant) {
    case 'mongodb':
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

    case 'postgresql':
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

    case 'supabase':
      return `
import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);
      `;

    default:
      return `// Banco desconhecido`;
  }
};
