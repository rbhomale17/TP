const express = require('express');
const userRegistrationMiddelware = require('../middelwares/userRegistration.middelware');
const UserModel = require('../models/UserModel');
const loginMiddelware = require('../middelwares/loginMiddelware');
const UserRouter = express.Router();
require('dotenv').config()

UserRouter.get('/', (req, res) => {
    res.send({ msg: 'Welcome To User Router.' })
})

UserRouter.post('/register', userRegistrationMiddelware, async (req, res) => {
    try {
        // console.log(req.body.name,req.body.email,req.body.password)
        let user = new UserModel({ name: req.body.name, email: req.body.email, password: req.body.password });
        await user.save();
        res.status(201).send({ msg: 'User Registered Succesfully.' })
    } catch (error) {
        res.status(400).send({ err: error.message })
    }
});

UserRouter.post('/login', loginMiddelware, (req, res) => {
    try {
        res.status(201).send({ msg: 'Log In Success', token: req.body.token })
    } catch (error) {
        res.send({ err: error.message })
    }
})



module.exports = UserRouter;