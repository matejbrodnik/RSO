const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { connectToDatabase } = require('./db');
const sql = require('mssql');
require('dotenv').config();

const app = express();

app.use(cors({
  origin: '*', 
}));

app.use(bodyParser.json());

(async () => {
    dbPool = await connectToDatabase();
  })();

app.get('/', (req, res) => {
    res.send('world Hello');
});

app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    console.log(username)

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

const PORT = process.env.PORT;
app.listen(PORT, '0.0.0.0', () => console.log(`Server running on http://localhost:${PORT}`));
