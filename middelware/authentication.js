// Imports
const jwt = require('jsonwebtoken');
const User = require('../models/users');
const fs = require('fs');
require('dotenv').config();

// Filesystem
// const login = fs.readFileSync(__dirname + "/../public/login.html", "utf-8");

// Authentication middelware --> Checks if a user have a match in their cookies
const authentication = async (req, res, next) => {
    try {
        const token = req.cookies["auth_token"]
        const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
        const user = await User.findOne({ _id: decoded._id, "tokens.token": token });

        if(!user) {
            throw new Error();
        };

        req.token = token;
        req.user = user;

        next();

    } catch (error) {
        res.redirect("/login");
    }
}



// Exports
module.exports = authentication