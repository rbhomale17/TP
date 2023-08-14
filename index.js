const express = require('express');
const connection = require('./config/db');
const UserRouter = require('./routes/user.router');
const FlightRouter = require('./routes/flight.router');
const BookingRouter = require('./routes/booking.router');
const swaggerJsdoc = require("swagger-jsdoc")
const swaggerUi = require("swagger-ui-express")

const app = express();
app.use(express.json());
require('dotenv').config()
const port = process.env.port || 8080;

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Air Ticket Booking Documentation',
            version: '1.0.0',
        },
    },
    apis: ['./routes/*.js'],
};

const openapiSpecification = swaggerJsdoc(options);
app.use('/documentation', swaggerUi.serve, swaggerUi.setup(openapiSpecification))

/**
 * @openapi
 * tags:
 *   name: Home
 *   description: API routes related to Flight
 */

app.get('/', (req, res) => {
    /**
     * @openapi
     * /:
     *   get:
     *     summary: Welcome message
     *     tags: [Home]
     *     responses:
     *       '200':
     *         description: Welcome message with author and documentation link
     *         content:
     *           application/json:
     *             example:
     *               msg: Welcome To Air Ticket Booking Backend
     *               name: Rushikesh Diliprao Bhomale
     *               student_code: fw25_348
     *               unit: RN101
     *               documentation_link: https://air-ticket-booking-server-fw25-348.onrender.com/documentation
     */
    res.send({
        msg: 'Welcome To Air Ticket Booking Backend',
        name: 'Rushikesh Diliprao Bhomale',
        student_code: 'fw25_348',
        unit: 'RN101',
        documentation_link: 'https://air-ticket-booking-server-fw25-348.onrender.com/documentation'
    });
});

app.use('/api', UserRouter)
app.use('/api', FlightRouter)
app.use('/api', BookingRouter)


app.listen(port, async () => {
    try {
        await connection;
        console.log('Connected to DB');
    } catch (error) {
        console.log(error);
        console.log('Failed To connect DB')
    }
    console.log(`Server Running At http://localhost:${port}`)
})