const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { connectToDatabase } = require('./db');
const sql = require('mssql');
require('dotenv').config();

const app = express();
app.use(bodyParser.json());
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'OPTIONS'],
}));

(async () => {
    dbPool = await connectToDatabase();
  })();

const KEY = 'AIzaSyBPiprMeKFTJrJ5_yBBLVOFjWy-iF86G2M';
const KEY1 = 'AIzaSyD26pAYLTTluZjgPsljecxy4ppWdudC33A';

app.get('/geo', async (req, res) => {
    const { address } = req.query;

    if (!address) {
        return res.status(400).json({ error: 'Address is required' });
    }

    try {
        const response = await axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
            params: {
                address: address,
                key: KEY1
            }
        });

        // Send the result back to the frontend
        res.json(response.data);
    } catch (error) {
        console.error('Error calling Google Maps API:', error);
        res.status(500).json({ error: 'Failed to fetch geocode data' });
    }
});

  
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

app.post('/locationlist', async (req, res) => {
    const { uid } = req.body;
    try {
        const result = await dbPool
            .request()
            .input('uid', sql.VarChar, uid)
            .query('SELECT * FROM Locations WHERE uid = @uid');
        console.log(result);
        res.json({ data: result.recordset ?? {} });
    } catch (err) {
        console.error(err);
        res.status(500).send('Database error');
    }
});

const PORT = process.env.PORT;
app.listen(PORT, '0.0.0.0', () => console.log(`Server running on http://localhost:${PORT}`));
