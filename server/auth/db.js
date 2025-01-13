// require('dotenv').config();
const sql = require('mssql');

console.log("user");
console.log(process.env.DB_USER);
console.log(process.env.DB_PASSWORD);
console.log(process.env.DB_SERVER);
console.log(process.env.DB_DB);

const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER,
  database: process.env.DB_DB,
  options: {
    encrypt: true,
    trustServerCertificate: false,
  },
};

async function connectToDatabase() {
  console.log("Connecting...")
  try {
    const pool = await sql.connect(config);
    console.log('Connected to the database');
    return pool;
  } catch (err) {
    console.error('Database connection failed!', err);
    throw err;
  }
}

module.exports = { connectToDatabase };
