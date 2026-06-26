const { Pool } = require('pg');
const { databaseUrl } = require('./env');

const isLocalDatabase =
  databaseUrl.includes('localhost') || databaseUrl.includes('127.0.0.1');

const pool = new Pool({
  connectionString: databaseUrl,
  ssl: isLocalDatabase ? false : { rejectUnauthorized: false },
});

const connectDatabase = async () => {
  await pool.query('SELECT 1');
  console.log('Database connected successfully');
};

module.exports = {
  pool,
  connectDatabase,
};
