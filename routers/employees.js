const express = require('express');
const router = new express.Router();
const authentication = require('../middelware/authentication.js');
const bodyParser = require('body-parser');

//Middelware
router.use(bodyParser.urlencoded({ extended: true }));

// Import model
const User = require('../models/users');

// Create a new employee
router.post("/employees/create", async (req, res) => {
    const user = new User(req.body);

    try {
        await user.save();
        await user.generateAuthToken();

        res.status(201).redirect("/employees")
    } catch (error) {
        res.status(400).send(error);
    }
});

// Get all employess
router.get("/employees/all", authentication, async (req, res) => {
    try{

        User.find({}, function(err, users) {
            let userMap = {};
        
            users.forEach(function(user) {
              userMap[user._id] = user;
            });
        
            res.send(userMap);  
            // console.log(userMap);
          });


        
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
});

// Get a employee by its ID
router.get("/employees/:id", authentication, async (req, res) => {

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



module.exports = router;

