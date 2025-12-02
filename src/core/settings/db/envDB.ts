export const envDB = (
  db: Symbol | 'mongodb' | 'postgresql' | 'supabase' | 'none',
) => {
  switch (db) {
    case 'mongodb':
      return `
# MongoDB
MONGO_URI=mongodb://localhost:27017/meu_banco
`;

    case 'postgresql':
      return `
# PostgreSQL
DATABASE_URL=postgresql://DB_USER:DB_PASS@localhost:5432/meu_banco
`;

    case 'supabase':
      return `
# Supabase
SUPABASE_URL=https://SEU_PROJETO.supabase.co
SUPABASE_KEY=SUA_SERVICE_ROLE_KEY
`;
  }
};
