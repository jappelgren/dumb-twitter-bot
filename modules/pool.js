const { Pool } = require('pg');

require('dotenv').config();

const config = {
  user: 'postgres',
  password: process.env.PG_PASSWORD,
  host: 'localhost',
  port: 5432,
  database: 'if_you_know',
};

const pool = new Pool(config);

pool.on('error', (err) => {
  console.log('Unexpected error on idle client', err);
  process.exit(-1);
});

module.exports = pool;
