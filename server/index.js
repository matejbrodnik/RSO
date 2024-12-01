const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { connectToDatabase } = require('./db');
const { v4: uuidv4 } = require("uuid");
const sql = require('mssql');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const storage = {
    uid: 1
};

// const users = [
//     { username: 'test', password: 'password' }
// ];

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
            storage.id = result.recordset[0].id;
            // res.redirect(302, '/home');
            res.json({ redirect: '/home' });

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

app.post('/location', async (req, res) => {
    const { lat, lng } = req.body;
    let uid = storage.id;
    console.log("UID: " + uid)
    try {
        const result = await dbPool
          .request()
          .input('uid', sql.Int, uid)
          .input('lat', sql.Float, lat)
          .input('lng', sql.Float, lng)
          .query('INSERT INTO Locations (uid, lat, lng) VALUES (@uid, @lat, @lng)');
        console.log(result);
        if (result) {
          res.status(200).send('Location successful');
        } else {
          res.status(401).send('Invalid credentials2');
        }
      } catch (err) {
        console.error(err);
        res.status(500).send('Database error2');
      }

});

const PORT = 4000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
