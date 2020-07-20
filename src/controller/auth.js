const express = require('express');
let router = express.Router();
const models = require('../models/models');
const users = models.usuariomodel;
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt')



const authSign = async (req, res) => {
    try {
        const { email, password } = req.body;
        let user = await users.findOne({ email });
        if (!user) return res.status(400).send("The data send not macth with any user");
        const match = user.comparePassword(password);
        if (!match) {
            return res.status(400).send({ message: "The data send not macth with any user" });
        }
        user.password = "true";

        res.send({ user, message: "The username and password combination is correct!" });
    } catch (error) {
        console.log(error);

        res.status(500).send(error);
    }
}

module.exports = {
    authSign
};