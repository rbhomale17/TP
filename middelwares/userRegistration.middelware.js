const bcrypt = require('bcrypt');
const UserModel = require('../models/UserModel');
require('dotenv').config()
const saltRounds = +process.env.saltRounds;


module.exports = async function registrationMiddelware(req, res, next) {

    const { name, email, password } = req.body;
    if (!name || !email || !password) return res.send({ msg: 'Please provide all the deatails, Key names is case-sensitive.' });
    let user = await UserModel.findOne({ email });
    console.log(user)
    if (!user)
        bcrypt.hash(password, saltRounds, (err, hash) => {
            req.body.password = hash;
            next();
        })
    else return res.send({ msg: 'User Already Exists!' });

}