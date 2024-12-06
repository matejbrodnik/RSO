const sql = require('mssql');

const config = {
  user: 'matej',
  password: 'Password123',
  server: 'rsoserver.database.windows.net',
  database: 'rsodb',
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
