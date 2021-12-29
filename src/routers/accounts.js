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
        res.status(201)
        .redirect("/");
    } catch (error) {
        res.status(400).send(error);
    }
});

// Get all users accounts 
router.get("/accounts/all", authentication, access('readOwn', 'account'), async (req, res) => {
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



// Get a account by its ID
router.get("/accounts/:id", authentication, access('readOwn', 'account'), async (req, res) => {

    try{
        const account = await Accounts.findOne({_id: req.params.id, owner: req.user._id});

        if(!account) {
            return res.status(404).send();
        }

        res.send(account);

    } catch (error) {
        res.status(500).send(error);
        console.log(error);
    }
});

router.post("/accounts/:id", authentication, access('updateOwn', 'account'), async (req, res) => {
    const updates = Object.keys(req.body);

    try{
        const account = await Accounts.findOne({_id: req.params.id, owner: req.user._id});

        if(!account) {
            return res.status(404).send();
        };

        updates.forEach((update) => {
            account[update] = req.body[update];
        });

        await account.save();

        res.redirect("/");

    } catch (error) {
        res.status(400).send(error);
    }
});

// Delete a single project
router.delete("/accounts/:id", authentication, access('deleteOwn', 'account'), async (req, res) => {
    try {
        const account = await Accounts.findOneAndDelete({ _id: req.params.id, owner: req.user._id});

        if(!account) {
            return res.status(404).send();
        };

        res.send(account);
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;