const express = require('express');
require('dotenv').config();
const axios = require('axios');
const app = express();

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
        url: "http://localhost:4002",
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


/**
 * @swagger
 * /weather:
 *   post:
 *     summary: Openmeteo API
 *     description: Retrieves 7-day daily weather forecast.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
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
 *         description: Successfully retrieved weather forecast.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               description: 7-day daily forecast data
 *       500:
 *         description: Openmeteo error.
 */
app.post('/weather', async (req, res) => {
    const { lat, lng } = req.body;
    try {
        const response = await axios.get(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max&timezone=auto`);
        res.json({ data: response.daily });
    } catch (err) {
        res.status(500).send('Openmeteo API error');
    }
});


const PORT = process.env.PORT;
app.listen(PORT, '0.0.0.0', () => console.log(`Server running on http://localhost:${PORT}`));
