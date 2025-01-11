const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { connectToDatabase } = require('./db');
const sql = require('mssql');
require('dotenv').config();
const client = require('prom-client');

const collectDefaultMetrics = client.collectDefaultMetrics;
const Registry = client.Registry;
const register = new Registry();
 
collectDefaultMetrics({ register });
const app = express();

app.use(cors({
  origin: '*', 
}));

app.use(bodyParser.json());

(async () => {
    dbPool = await connectToDatabase();
})();

app.get('/', (req, res) => {
    res.send('Hello world');
});

app.get('/health', (req, res) => {
  console.log("here");
    res.status(200).send('OK'); 
});

app.get('/ready', async (req, res) => {
    try {
        const result = await dbPool.request().query('SELECT 1 AS Ready');
        if (result.recordset[0].Ready === 1)
            res.status(200).send('OK'); 
    }
    catch {
        res.status(503).send('Database not ready'); 
    }
});

app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    console.log(username)
    const end = httpRequestDuration.startTimer();
    try {
        const result = await dbPool
          .request()
          .input('username', sql.VarChar, username)
          .input('password', sql.VarChar, password)
          .query('SELECT * FROM Users WHERE username = @username AND password = @password');

        if (result.recordset && result.recordset.length > 0) {
            console.log(result);
            res.json({ uid: result.recordset[0].id, redirect: '/home' });
        } else {
          res.status(401).send('Invalid credentials');
        }
      } catch (err) {
        console.error(err);
        res.status(500).send('Database error');
      }
});

app.post('/register', async (req, res) => {
    const { username, password } = req.body;
    console.log(username)

    try {
        const result = await dbPool
          .request()
        //   .input('id', sql.Int, uuidv4())
          .input('username', sql.VarChar, username)
          .input('password', sql.VarChar, password)
          .query('INSERT INTO Users (username, password) VALUES (@username, @password)');
        console.log(result)
        if (result) {
          res.status(200).send('Register successful');
        } else {
          res.status(401).send('Invalid credentials1');
        }
      } catch (err) {
        console.error(err);
        res.status(500).send('Database error1');
      }

});

// app.get('/metrics', async (req, res) => {
//   res.set('Content-Type', register.contentType);
//   res.end(await register.metrics());
// });

app.get('/metrics', async (req, res) => {
  res.set('Content-Type', register.contentType);
  res.send(await register.metrics());
});

const PORT = process.env.PORT;
app.listen(PORT, '0.0.0.0', () => console.log(`Server running on http://localhost:${PORT}`));
