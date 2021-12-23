// Imports
const express = require('express');
const router = new express.Router();
const authentication = require('../middelware/authentication.js');
const access = require('../middelware/grantAccess.js');
const bodyParser = require('body-parser');

//Middelware
router.use(bodyParser.urlencoded({ extended: true }));

// Import model
const User = require('../models/users');

// Get user profile
router.get("/users/me", authentication, access('readOwn','users'), (req, res) => {
    res.status(200).send(req.user);
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

// Update a user
router.post("/users/userUpdate", authentication, access('updateOwn','users'), async (req, res) => {
    const updates = Object.keys(req.body);

    try {
        updates.forEach((update) => {
            req.user[update] = req.body[update];
        });

        await req.user.save();

        res.redirect("/profile");

    } catch (error) {
        res.status(400).send(error);
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

// Logout all user sessions
router.post("/users/logoutAllSessions", authentication, async (req, res) => {
    try {
        req.user.tokens = [];
        await req.user.save();
        res.clearCookie("auth_token");
        res.redirect("/login");
    } catch (error) {
        res.status(500).send();
    }
});

module.exports = router;