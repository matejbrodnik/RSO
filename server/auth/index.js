const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { connectToDatabase } = require('./db');
const sql = require('mssql');

const app = express();
app.use(bodyParser.json());
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'OPTIONS'],
}));


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
        //   res.status(200).send('Login successful');
            console.log(result);
            // res.redirect(302, '/home');
            res.json({ uid: result.recordset[0].id, redirect: '/home' });

        } else {
          res.status(401).send('Invalid credentials');
        }
      } catch (err) {
        console.error(err);
        res.status(500).send('Database error');
      }

    // if (user) {
    //     res.json({ message: 'Login successful', token: 'dummy-token' });
    // } else {
    //     res.status(401).json({ message: 'Invalid username or password' });
    // }
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


const PORT = 4000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
