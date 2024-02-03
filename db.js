import 'dotenv/config'
import postgres from 'postgres'

const { PGHOST, PGDATABASE, PGUSER, PGPASSWORD, ENDPOINT_ID } = process.env;

// Cria a conexão com o PostgreSQL
const sql = postgres({
  host: PGHOST,
  database: PGDATABASE,
  user: PGUSER, // Em vez de 'username', é 'user'
  password: PGPASSWORD,
  port: 5432,
  ssl: 'require',
  connection: {
    options: `project=${ENDPOINT_ID}`,
  },
});

export default sql;