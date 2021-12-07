const express = require('express');
const router = new express.Router();
const authentication = require('../middelware/authentication.js');
const bodyParser = require('body-parser');

//Middelware
router.use(bodyParser.urlencoded({ extended: true }));

// Import model
const User = require('../models/users');

// Create a new employee
router.post("/employess/create", async (req, res) => {
    const user = new User(req.body);

    try {
        await user.save();
        await user.generateAuthToken();

        res.status(201)
    } catch (error) {
        res.status(400).send(error);
    }
});

// Get all employess
router.get("/employess/all", authentication, async (req, res) => {
    try{
        await req.user.populate({
            path: "user",
            options: {

            }
        });

        res.send(req.user);
        console.log(req.user);
        
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
});



module.exports = router;

