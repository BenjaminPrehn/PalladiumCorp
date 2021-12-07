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
const employessRouter = require('./routers/employess');

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
app.use(employessRouter);

// File System 
const login = fs.readFileSync(__dirname + "/public/login.html", "utf-8");
const create = fs.readFileSync(__dirname + "/public/create.html", "utf-8");
const dashboard = fs.readFileSync(__dirname + "/public/admin/dashboard.html", "utf-8");
const profile = fs.readFileSync(__dirname + "/public/profile/profile.html", "utf-8");
const employess = fs.readFileSync(__dirname + "/public/employess/employess.html", "utf-8");
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

app.get("/profile", authentication, (req, res) => {
    res.send(header + profile + footer);
});

app.get("/employess", authentication, (req, res) => {
    res.send(header + employess + footer);
});




// Server setup
app.listen(port, (error) => {
    if (error) {
        console.log('There was an issue starting your application ', error);
    }
    console.log('The app is running on port:', port);
});