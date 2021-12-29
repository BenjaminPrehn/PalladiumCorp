const express = require('express');
const authentication = require('../middelware/authentication.js');
const access = require('../middelware/grantaccess.js');
const Accounts = require('../models/account');
const User = require('../models/users');
const router = new express.Router();

// Get ALL accounts
router.get("/admin/accounts/all", authentication, access('readAny', 'users'), async (req, res) => {
    try{

        Accounts.find({}, function(err, accounts) {
            let accountsMap = {};
        
            accounts.forEach(function(account) {
              accountsMap[account._id] = account;
            });
        
            res.send(accountsMap);  
          });
        
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
});

// Delete a single account
router.delete("/admin/accounts/:id", authentication, access('deleteAny', 'account'), async (req, res) => {
    try {
        const account = await Accounts.findOneAndDelete({ _id: req.params.id });

        if(!account) {
            return res.status(404).send();
        };

        res.send(account);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Get a account by its ID
router.get("/admin/accounts/:id", authentication, access('readAny', 'account'), async (req, res) => {

    try{
        const account = await Accounts.findOne({_id: req.params.id });

        if(!account) {
            return res.status(404).send();
        }

        res.send(account);

    } catch (error) {
        res.status(500).send(error);
        console.log(error);
    }
});

// Update account by its ID
router.post("/admin/accounts/:id", authentication, access('updateAny', 'account'), async (req, res) => {
    const updates = Object.keys(req.body);

    try{
        const account = await Accounts.findOne({_id: req.params.id });

        if(!account) {
            return res.status(404).send();
        };

        updates.forEach((update) => {
            account[update] = req.body[update];
        });

        await account.save();

        res.redirect("/accounts");

    } catch (error) {
        res.status(400).send(error);
    }
});

// Get all employess
router.get("/admin/employees/all", authentication, access('readAny', 'users'), async (req, res) => {
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

// Get a account by its ID and fetch all users
router.get("/admin/accountsanduser/:id", authentication, access('readAny', 'account'), async (req, res) => {

    try{
        const account = await Accounts.findOne({_id: req.params.id });

        if(!account) {
            return res.status(404).send();
        }

        res.send(account);

        User.find({}, function(err, users) {
            let userMap = {};
        
            users.forEach(function(user) {
              userMap[user._id] = user;
            });
        
            res.send(userMap);  
            // console.log(userMap);
          });

    } catch (error) {
        res.status(500).send(error);
        console.log(error);
    }
});



module.exports = router;