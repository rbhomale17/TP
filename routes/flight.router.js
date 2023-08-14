const express = require('express');
const FlightModel = require('../models/Flight.Model');
const AddFlightMiddelware = require('../middelwares/AddFlightMiddelware');
const FlightRouter = express.Router();

/**
 * @openapi
 * tags:
 *   name: Flight
 *   description: API routes related to Flight
 */

/**
 * @openapi
 * /api:
 *   get:
 *     summary: Welcome Note From Flight Router
 *     tags: [Flight]
 *     responses:
 *       '200':
 *         description: List of all users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
//  *                 $ref: '#/components/schemas/User'
 */

FlightRouter.get('/', (req, res) => {
    res.send({ msg: 'welcome to filgth Router' })
})

/**
 * @openapi
 * /api/flights:
 *   get:
 *     summary: Get All Flights 
 *     tags: [Flight]
 *     responses:
 *       '200':
 *         description: List of all flights
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 */
FlightRouter.get('/flights', async (req, res) => {
    try {
        let flights = await FlightModel.find();
        if (!flights) return res.send({ msg: "No Flight is Available" })
        res.status(200).send({ mag: 'All Fligths Data', flights })
    } catch (error) {
        res.send({ err: error.message })
    }
})


/**
 * @openapi
 * /api/flights/{id}:
 *   get:
 *     summary: Get Flight By ID
 *     tags: [Flight]
 *     parameters:
 *       - in: path
 *         name: Insert id Here
 *         required: true
 *         schema:
 *           type: string
 *           default: 64da18f98da9762db6ae7f30
 *     responses:
 *       '200':
 *         description: List of flights
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 */

FlightRouter.get('/flights/:id', async (req, res) => {
    try {
        if (!req.params.id) return res.send({ msg: 'Please Provide ID' })
        let flight = await FlightModel.findById(req.params.id);
        if (!flight) return res.send({ msg: "No Flight is Available" })
        res.status(200).send({ msg: `Flight Data for ID : ${req.params.id}`, flight })
    } catch (error) {
        res.send({ err: error.message })
    }
})

/**
 * @openapi
 * /api/flights/{id}:
 *   patch:
 *     summary: Update Flight Data By ID
 *     tags: [Flight]
 *     parameters:
 *       - in: path
 *         name: Insert id Here to Update
 *         required: true
 *         schema:
 *           type: string
 *           default: 64da18f98da9762db6ae7f30
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateFlightData'
 *     responses:
 *       '200':
 *         description: Flight data updated successfully
 *       '400':
 *         description: Error in updating flight data
 */

/**
 * @openapi
 * components:
 *   schemas:
 *     UpdateFlightData:
 *       type: object
 *       properties:
 *         airline:
 *           type: string
 *         flightNo:
 *           type: string
 *         departure:
 *           type: string
 *         arrival:
 *           type: string
 *         departureTime:
 *           type: string
 *           format: date-time
 *         arrivalTime:
 *           type: string
 *           format: date-time
 *         seats:
 *           type: integer
 *         price:
 *           type: number
 *       example:
 *         airline: "Example Airlines"
 *         flightNo: "E123"
 *         departure: "City A"
 *         arrival: "City B"
 *         departureTime: "2023-08-14T10:00:00Z"
 *         arrivalTime: "2023-08-14T12:00:00Z"
 *         seats: 150
 *         price: 250.99
 */


FlightRouter.patch('/flights/:id', async (req, res) => {
    try {
        if (!req.params.id) return res.send({ msg: 'Please Provide ID' })
        let flight = await FlightModel.findByIdAndUpdate(req.params.id, req.body);
        if (!flight) return res.send({ msg: "No Flight is Available" })
        res.status(204).send({ msg: `Flight Data for ID : ${req.params.id} is updated`, flight })
    } catch (error) {
        res.send({ err: error.message })
    }
})


/**
 * @openapi
 * /api/flights/{id}:
 *   delete:
 *     summary: Delete Flight By ID
 *     tags: [Flight]
 *     parameters:
 *       - in: path
 *         name: Insert id Here to Delete
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Flight deleted successfully
 *       '400':
 *         description: Error in deleting flight
 */


FlightRouter.delete('/flights/:id', async (req, res) => {
    try {
        if (!req.params.id) return res.send({ msg: 'Please Provide ID' })
        let flight = await FlightModel.findByIdAndDelete(req.params.id, req.body);
        res.status(202).send({ msg: `Flight Data for ID : ${req.params.id} is deleted` })
    } catch (error) {
        res.send({ err: error.message })
    }
})


/**
 * @openapi
 * /api/flights:
 *   post:
 *     summary: Add New Flight
 *     tags: [Flight]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NewFlight'
 *     responses:
 *       '201':
 *         description: Flight added successfully
 *       '400':
 *         description: Error in adding flight
 */

/**
 * @openapi
 * components:
 *   schemas:
 *     NewFlight:
 *       type: object
 *       properties:
 *         airline:
 *           type: string
 *         flightNo:
 *           type: string
 *         departure:
 *           type: string
 *         arrival:
 *           type: string
 *         departureTime:
 *           type: string
 *           format: date-time
 *         arrivalTime:
 *           type: string
 *           format: date-time
 *         seats:
 *           type: integer
 *         price:
 *           type: number
 *       example:
 *         airline: "Example Airlines-1"
 *         flightNo: "E123"
 *         departure: "City A"
 *         arrival: "City B"
 *         departureTime: "2023-08-14T10:00:00Z"
 *         arrivalTime: "2023-08-14T12:00:00Z"
 *         seats: 150
 *         price: 2500.99
 */


FlightRouter.post('/flights', AddFlightMiddelware, async (req, res) => {
    try {
        let flight = new FlightModel(req.body);
        await flight.save();
        res.status(201).send({ msg: 'New Flight registered', flight })
    } catch (error) {
        res.send({ err: error.message })
    }
})


module.exports = FlightRouter;