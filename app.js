// Imports
const express = require('express');
const fs = require('fs');
const cookieParser = require('cookie-parser');
const authentication = require('./middelware/authentication.js');
require('./database/mongoose');
require('dotenv').config();

// Setup of express
const app = express();

// Import routes
const userRouter = require('./routers/user');
const accountsRouter = require('./routers/accounts');

// Port 
const port = process.env.PORT || 8080;

// Middelware
app.use(express.static(__dirname + "/public"));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

// Routes 
app.use(userRouter);
app.use(accountsRouter);

// File System 
const login = fs.readFileSync(__dirname + "/public/login.html", "utf-8");
const create = fs.readFileSync(__dirname + "/public/create.html", "utf-8");
const dashboard = fs.readFileSync(__dirname + "/public/admin/dashboard.html", "utf-8");
const header = fs.readFileSync(__dirname + "/public/header/header.html", "utf-8");
const footer = fs.readFileSync(__dirname + "/public/footer/footer.html", "utf-8");


// End points
app.get("/login", (req, res) => {
    res.send(login);
});

app.get("/create", (req, res) => {
    res.send(create);
});

app.get("/", authentication, (req, res) => {
    res.send(header + dashboard + footer);
});




// Server setup
app.listen(port, (error) => {
    if (error) {
        console.log('There was an issue starting your application ', error);
    }
    console.log('The app is running on port:', port);
});