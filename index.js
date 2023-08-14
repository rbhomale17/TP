const express = require('express');
const connection = require('./config/db');
const UserRouter = require('./routes/user.router');
const FlightRouter = require('./routes/flight.router');
const BookingRouter = require('./routes/booking.router');
const app = express();
app.use(express.json());
require('dotenv').config()
const port = process.env.port || 8080;

app.get('/', (req, res) => {
    res.send({
        msg: 'Welcome To Air Ticket Booking Backend',
        name: 'Rushikesh Diliprao Bhomale',
        student_code: 'fw25_348',
        unit: 'RN101'
    })
})

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