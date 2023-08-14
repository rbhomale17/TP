const express = require('express');
const BookingModel = require('../models/Booking.Model');
const BookingRouter = express.Router();

/**
 * @openapi
 * tags:
 *   name: Booking
 *   description: API routes related to Flight
 */


BookingRouter.get('/', (req, res) => {
    res.send({ msg: 'Welcoe to Booing Router' })
})

/**
 * @openapi
 * /api/booking:
 *   post:
 *     summary: Create a New Booking
 *     tags: [Booking]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NewBooking'
 *     responses:
 *       '201':
 *         description: Booking created successfully
 *       '400':
 *         description: Error in creating booking
 */

/**
 * @openapi
 * components:
 *   schemas:
 *     NewBooking:
 *       type: object
 *       properties:
 *         user:
 *           type: string
 *           description: User ID (reference to User model)
 *         flight:
 *           type: string
 *           description: Flight ID (reference to Flight model)
 *       example:
 *         user: 64da3f6cb0981d68d35e761e
 *         flight: 64da18d08da9762db6ae7f2d
 */


BookingRouter.post('/booking', async (req, res) => {
    const { user, flight } = req.body;
    if (!user || !flight) return res.send({ msg: 'Please Provide The User And Flight ID ( user, flight )' })
    try {
        let booking = new BookingModel(req.body);
        await booking.save();
        res.status(201).send({ msg: 'Booking Successfully', booking })
    } catch (error) {
        res.send({ err: error.message })
    }
});

/**
 * @openapi
 * /api/dashboard:
 *   get:
 *     summary: Get all Bookings 
 *     tags: [Booking]
 *     responses:
 *       '200':
 *         description: List of all bookings
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 */

BookingRouter.get('/dashboard', async (req, res) => {
    try {
        let BookingData = await BookingModel.find().populate('user').populate('flight');
        res.status(200).send({ BookingData })
    } catch (error) {
        res.send({ err: error.message })
    }
})

/**
 * @openapi
 * /api/dashboard/{id}:
 *   get:
 *     summary: Get Booking By ID 
 *     tags: [Booking]
 *     parameters:
 *       - in: path
 *         name: Insert id Here
 *         required: true
 *         schema:
 *           type: string
 *           default: 64da1d9822687df5538ba122
 *     responses:
 *       '200':
 *         description: List of all bookings
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 */
BookingRouter.get('/dashboard/:id', async (req, res) => {
    try {
        if (!req.params.id) return res.send({ msg: 'Please Provide ID' })
        let BookingData = await BookingModel.findById(req.params.id).populate('user').populate('flight');
        res.status(200).send({ msg: `Booking data of ID: ${req.params.id}`, BookingData })
    } catch (error) {
        res.send({ err: error.message })
    }
})

/**
 * @openapi
 * /api/dashboard/{id}:
 *   patch:
 *     summary: Update Booking By ID
 *     tags: [Booking]
 *     parameters:
 *       - in: path
 *         name: Insert id Here to Update
 *         required: true
 *         schema:
 *           type: string
 *           default: 64da1d9822687df5538ba122
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateBooking'
 *     responses:
 *       '200':
 *         description: Booking updated successfully
 *       '400':
 *         description: Error in updating booking
 */

/**
 * @openapi
 * components:
 *   schemas:
 *     UpdateBooking:
 *       type: object
 *       properties:
 *         user:
 *           type: string
 *           description: User ID (reference to User model)
 *         flight:
 *           type: string
 *           description: Flight ID (reference to Flight model)
 *       example:
 *         user: 64da3f6cb0981d68d35e761e
 *         flight: 64da18d08da9762db6ae7f2d
 */

BookingRouter.patch('/dashboard/:id', async (req, res) => {
    try {
        if (!req.params.id) return res.send({ msg: 'Please Provide ID' })
        const { user, flight } = req.body;
        if (user || flight) {
            let BookingData = await BookingModel.findByIdAndUpdate(req.params.id, req.body);
            res.status(204).send({ msg: `Booking of ID: ${req.params.id} is Updated`, BookingData })
        } else {
            res.send({ msg: 'Please Provide User || Flight in body' })
        }
    } catch (error) {
        res.send({ err: error.message })
    }
})

/**
 * @openapi
 * /api/dashboard/{id}:
 *   delete:
 *     summary: Delete Booking By ID
 *     tags: [Booking]
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

BookingRouter.delete('/dashboard/:id', async (req, res) => {
    try {
        if (!req.params.id) return res.send({ msg: 'Please Provide ID' })
        let BookingData = await BookingModel.findByIdAndDelete(req.params.id);
        res.status(202).send({ msg: `Booking of ID: ${req.params.id} is Deleted.` })

    } catch (error) {
        res.send({ err: error.message })
    }
})


module.exports = BookingRouter;