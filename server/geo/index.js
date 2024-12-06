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

app.post('/location', async (req, res) => {
    const { uid, lat, lng } = req.body;
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

const PORT = 4001;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
