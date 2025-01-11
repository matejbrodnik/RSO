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
        url: "http://localhost:4000",
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
 * /login:
 *   post:
 *     summary: User login
 *     description: Authenticates a user by verifying their username and password.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: The username of the user.
 *                 example: janeznovak
 *               password:
 *                 type: string
 *                 description: The password of the user.
 *                 example: password123
 *     responses:
 *       200:
 *         description: Successfully authenticated.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 uid:
 *                   type: integer
 *                   description: User ID.
 *                   example: 1
 *                 redirect:
 *                   type: string
 *                   description: Redirect URL after successful login.
 *                   example: "/home"
 *       401:
 *         description: Invalid credentials.
 *       500:
 *         description: Database error.
 */
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

/**
 * @swagger
 * /register:
 *   post:
 *     summary: Register new user
 *     description: Registers a user if the username is unique.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: The username of the user.
 *                 example: janeznovak
 *               password:
 *                 type: string
 *                 description: The password of the user.
 *                 example: password123
 *     responses:
 *       200:
 *         description: User registered.
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: Registration successful
 *       401:
 *         description: User already exists.
 *       500:
 *         description: Database error.
 */
app.post('/register', async (req, res) => {
    const { username, password } = req.body;

    try {
        const result1 = await dbPool
          .request()
          .input('username', sql.VarChar, username)
          .query('SELECT * FROM Users WHERE username = @username');
        if (result1.recordset && result1.recordset.length > 0) 
            res.status(401).send('User already exists');
        else {
            const result2 = await dbPool
              .request()
              .input('username', sql.VarChar, username)
              .input('password', sql.VarChar, password)
              .query('INSERT INTO Users (username, password) VALUES (@username, @password)');
            if (result2) {
                res.status(200).send('Registration successful');
            } else {
                res.status(401).send('Invalid credentials');
            }
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
