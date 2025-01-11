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

app.post('/weather', async (req, res) => {
    const { lat, lng } = req.body;

    try {
        res.json({ uid: result.recordset[0].id, redirect: '/home' }); // !!!
    } catch (err) {
        res.status(500).send('Openmeteo API error');
    }
});


const PORT = process.env.PORT;
app.listen(PORT, '0.0.0.0', () => console.log(`Server running on http://localhost:${PORT}`));
