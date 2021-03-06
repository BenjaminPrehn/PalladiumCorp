const express = require('express');
const router = new express.Router();
const authentication = require('../middelware/authentication.js');
const access = require('../middelware/grantaccess.js');
const bodyParser = require('body-parser');

//Middelware
router.use(bodyParser.urlencoded({ extended: true }));

// Import model
const User = require('../models/users');

// Create a new employee
router.post("/employees/create", authentication, access('createAny', 'users'), async (req, res) => {
    const user = new User(req.body);

    try {
        await user.save();
        await user.generateAuthToken();

        res.status(201).redirect("/employees")
    } catch (error) {
        res.status(400).send(error);
    }
});

// Get a employee by its ID
router.get("/employees/:id", authentication, access('readAny', 'users'), async (req, res) => {

    try{
        const employee = await User.findOne({_id: req.params.id});

        if(!employee) {
            return res.status(404).send();
        }

        res.send(employee);

    } catch (error) {
        res.status(500).send(error);
        console.log(error);
    }
});

//Update employee by ID

router.post("/employees/:id", authentication, access('updateAny', 'users'), async (req, res) => {
    const updates = Object.keys(req.body);

    try{
        const user = await User.findOne({_id: req.params.id});

        if(!user) {
            return res.status(404).send();
        };

        updates.forEach((update) => {
            user[update] = req.body[update];
        });

        await user.save();

        res.redirect("/employees");

    } catch (error) {
        res.status(400).send(error);
    }
});

// Delete a single project
router.delete("/employees/:id", authentication, access('deleteAny', 'users'), async (req, res) => {
    try {
        const user = await User.findOneAndDelete({ _id: req.params.id});

        if(!user) {
            return res.status(404).send();
        };

        res.send(user);
    } catch (error) {
        res.status(500).send(error);
    }
});



module.exports = router;

