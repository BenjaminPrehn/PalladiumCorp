// Imports
const express = require('express');
const router = new express.Router();
const authentication = require('../middelware/authentication.js');
const bodyParser = require('body-parser');

//Middelware
router.use(bodyParser.urlencoded({ extended: true }));

// Import model
const User = require('../models/users');

// Create a new user
router.post("/users/create", async (req, res) => {
    const user = new User(req.body);

    try {
        await user.save();
        await user.generateAuthToken();

        res.status(201).redirect("/login")
    } catch (error) {
        res.status(400).send(error);
    }
});

// Get user profile
router.get("/users/me", authentication, (req, res) => {
    res.send(req.user);
});

// Login a user
router.post("/users/login", async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password);
        const token = await user.generateAuthToken();
        res.cookie("auth_token", token, { maxAge: 21600000 });
        res.redirect("/");
    } catch (error) {
        res.status(400).send(`<h1> Wrong Credentials</h1> <a href='/login'><h2> Try again please </h2></a> <p> ${error} </p>`);

    }
});

// Logout a user
router.post("/users/logout", authentication, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token;
        });

        await req.user.save();

        res.clearCookie("auth_token");
        res.redirect("/login");

    } catch (error) {
        console.log(error);
        res.status(500).send();
    }
});

module.exports = router;