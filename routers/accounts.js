const express = require('express');
const authentication = require('../middelware/authentication.js');
const access = require('../middelware/grantaccess.js');
const Accounts = require('../models/account');
const router = new express.Router();

// Create a new account
router.post("/accounts", authentication, access('createOwn', 'account'), async (req, res) => {
    const accounts = new Accounts({
        ...req.body,
        owner: req.user._id
    });

    try {
        await accounts.save();
        res.status(201).redirect("/");
    } catch (error) {
        res.status(400).send(error);
    }
});

// Get all accounts 
router.get("/accounts/all", authentication, async (req, res) => {
    try{
        await req.user.populate({
            path: "accounts",
            options: {

            }
        });

        res.send(req.user.accounts);
        
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
});

module.exports = router;