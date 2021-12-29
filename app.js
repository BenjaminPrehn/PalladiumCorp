// Imports
const express = require('express');
const fs = require('fs');
const cookieParser = require('cookie-parser');
const authentication = require('./src/middelware/authentication.js');
require('./src/database/mongoose');
require('dotenv').config();

// Setup of express
const app = express();

// Import routes
const userRouter = require('./src/routers/user');
const accountsRouter = require('./src/routers/accounts');
const employessRouter = require('./src/routers/employees');
const adminRouter = require('./src/routers/admin');
const mailRouter = require('./src/routers/mail');

// Middelware
app.use(express.static(__dirname + "/src/public"));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

// Routes 
app.use(userRouter);
app.use(accountsRouter);
app.use(employessRouter);
app.use(adminRouter);
app.use(mailRouter);

// File System 
const login = fs.readFileSync(__dirname + "/src/public/login.html", "utf-8");
const create = fs.readFileSync(__dirname + "/src/public/create.html", "utf-8");
const dashboard = fs.readFileSync(__dirname + "/src/public/dashboard/dashboard.html", "utf-8");
const profile = fs.readFileSync(__dirname + "/src/public/profile/profile.html", "utf-8");
const adminEmployees = fs.readFileSync(__dirname + "/src/public/admin/employees/employees.html", "utf-8");
const adminAccounts = fs.readFileSync(__dirname + "/src/public/admin/accounts/accounts.html", "utf-8");
const header = fs.readFileSync(__dirname + "/src/public/header/header.html", "utf-8");
const footer = fs.readFileSync(__dirname + "/src/public/footer/footer.html", "utf-8");


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

app.get("/employees", authentication, (req, res) => {
    if(req.user.role == 'admin'){
        res.send(header + adminEmployees + footer);
    }else{
        res.send('Access denied')
    }
});

app.get("/accounts", authentication, (req, res) => {
    if(req.user.role == 'admin'){
        res.send(header + adminAccounts + footer);
    }else{
        res.send('Access denied')
    }
});

module.exports = app;