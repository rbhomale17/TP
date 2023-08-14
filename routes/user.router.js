const express = require('express');
const userRegistrationMiddelware = require('../middelwares/userRegistration.middelware');
const UserModel = require('../models/UserModel');
const loginMiddelware = require('../middelwares/loginMiddelware');
const UserRouter = express.Router();
require('dotenv').config();

/**
 * @openapi
 * tags:
 *   name: Users
 *   description: API routes related to User
 */

/**
 * @openapi
 * /api:
 *   get:
 *     summary: Welcome Note From User Router
 *     tags: [Users]
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

UserRouter.get('/', (req, res) => {
    res.send({ msg: 'Welcome To User Router.' });
});

/**
 * @openapi
 * /api/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               name:
 *                 type: string
 *               password:
 *                 type: string
 *             example:
 *               email: user@example.com
 *               name: John Doe
 *               password: mypassword123
 *     responses:
 *       '201':
 *         description: User registered successfully
 *       '400':
 *         description: Error in user registration
 */

UserRouter.post('/register', userRegistrationMiddelware, async (req, res) => {
    try {
        let user = new UserModel({ name: req.body.name, email: req.body.email, password: req.body.password });
        await user.save();
        res.status(201).send({ msg: 'User Registered Successfully.' });
    } catch (error) {
        res.status(400).send({ err: error.message });
    }
});


/**
 * @openapi
 * /api/login:
 *   post:
 *     summary: Log in a user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               name:
 *                 type: string
 *               password:
 *                 type: string
 *             example:
 *               email: user@example.com
 *               password: mypassword123
 *     responses:
 *       '201':
 *         description: Log in successful
 *       '400':
 *         description: Error in login
 */
UserRouter.post('/login', loginMiddelware, (req, res) => {
    try {
        res.status(201).send({ msg: 'Log In Success', token: req.body.token });
    } catch (error) {
        res.send({ err: error.message });
    }
});

module.exports = UserRouter;
