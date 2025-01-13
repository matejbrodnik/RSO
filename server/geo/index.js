const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { connectToDatabase } = require('./db');
const sql = require('mssql');
//require('dotenv').config();

const app = express();
app.use(bodyParser.json());
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'OPTIONS'],
}));

(async () => {
    dbPool = await connectToDatabase();
})();

const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Authentication API",
      version: "1.0.0",
      description: "API for user authentication",
    },
    servers: [
      {
        url: "http://localhost:4001",
      },
    ],
  },
  apis: [__filename], 
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));


app.get('/health', (req, res) => {
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

/**
 * @swagger
 * /location:
 *   post:
 *     summary: Save new location
 *     description: Saves a location's coordinates 
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               uid:
 *                 type: integer
 *                 description: User ID.
 *                 example: 1
 *               lat:
 *                 type: number
 *                 description: Location's latitude.
 *                 example: 55.12
 *               lng:
 *                 type: number
 *                 description: Location's longitude.
 *                 example: 11.95
 *     responses:
 *       200:
 *         description: Location saved.
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: Location saved successfuly
 *       401:
 *         description: Invalid credentials.
 *       500:
 *         description: Database error.
 */
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
          res.status(200).send('Location saved successfuly');
        } else {
          res.status(401).send('Invalid credentials');
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Database error');
    }
});

/**
 * @swagger
 * /locationlist:
 *   post:
 *     summary: Location list
 *     description: Retrieves list of user's saved locations.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               uid:
 *                 type: integer
 *                 description: The user ID.
 *                 example: 1
 *     responses:
 *       200:
 *         description: Successfully retrieved location list.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   description: Array of location records associated with the user.
 *                   items:
 *                     type: object
 *                     properties:
 *                       uid:
 *                         type: integer
 *                         description: User ID.
 *                         example: 1
 *                       lat:
 *                         type: number
 *                         description: Location's latitude.
 *                         example: 55.12
 *                       lng:
 *                         type: number
 *                         description: Location's longitude.
 *                         example: 11.95
 *       401:
 *         description: Invalid credentials.
 *       500:
 *         description: Database error.
 */
app.post('/locationlist', async (req, res) => {
    const { uid } = req.body;
    try {
        const result = await dbPool
            .request()
            .input('uid', sql.VarChar, uid)
            .query('SELECT * FROM Locations WHERE uid = @uid');
        if(result)
            res.json({ data: result.recordset ?? {} });
        else
            res.status(500).send('Invalid credentials');
    } catch (err) {
        console.error(err);
        res.status(500).send('Database error');
    }
});

app.post('/getkey', async (req, res) => {
    res.json({ key: process.env.KEY }); // v config od geo, ne of frotnend
});

const PORT = process.env.PORT || 4001;
app.listen(PORT, '0.0.0.0', () => console.log(`Server running on http://localhost:${PORT}`));
