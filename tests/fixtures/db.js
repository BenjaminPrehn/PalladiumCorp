const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = require('../../src/models/users');
const Accounts = require('../../src/models/account');

const userAdminId = new mongoose.Types.ObjectId();
const userAdmin = {
    _id: userAdminId,
    firstname: 'Admin',
    lastname: 'Test',
    email: 'test@test.com',
    password: 'WhatinTheWorldIsGoingOn',
    role: 'admin',
    tokens: [{
        token: jwt.sign({ _id: userAdminId}, process.env.TOKEN_SECRET)
    }]
};

const userNotAdminId = new mongoose.Types.ObjectId();
const userNotAdmin = {
    _id: userNotAdminId,
    firstname: 'User',
    lastname: 'Test',
    email: 'user@test.com',
    password: 'WhatinTheWorldIsGoingOn',
    role: 'user',
    tokens: [{
        token: jwt.sign({ _id: userNotAdminId}, process.env.TOKEN_SECRET)
    }]
};

const accountOne = {
    _id: new mongoose.Types.ObjectId(),
    network: 'Aff network',
    username: 'testing@test.com',
    password: 'mySuperSecretPass',
    owner: userNotAdminId
}

const accountTwo = {
    _id: new mongoose.Types.ObjectId(),
    network: 'Aff network the second',
    username: 'testingtwo@test.com',
    password: 'mySuperSecretPass',
    owner: userNotAdminId
}

const accountThree = {
    _id: new mongoose.Types.ObjectId(),
    network: 'Aff network the third',
    username: 'testingthree@test.com',
    password: 'mySuperSecretPass',
    owner: userAdminId
}

const setupDatabase = async () => {
    await User.deleteMany();
    await Accounts.deleteMany();
    await new User(userAdmin).save();
    await new User(userNotAdmin).save();
    await Accounts(accountOne).save();
    await Accounts(accountTwo).save();
    await Accounts(accountThree).save();
}

module.exports = {
    userAdminId,
    userAdmin,
    userNotAdminId,
    userNotAdmin,
    accountOne,
    accountTwo,
    accountThree,
    setupDatabase
}