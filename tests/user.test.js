const request = require('supertest');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const app = require('../app');
const User = require('../src/models/users');

const userOneId = new mongoose.Types.ObjectId();
const userOne = {
    _id: userOneId,
    firstname: 'User',
    lastname: 'Test',
    email: 'test@test.com',
    password: 'WhatinTheWorldIsGoingOn',
    tokens: [{
        token: jwt.sign({ _id: userOneId}, process.env.TOKEN_SECRET)
    }]
}

beforeEach(async () => {
    await User.deleteMany();
    await new User(userOne).save();
});

// test('Should signup a new user', async () => {
//     const response = await request(app).post('/users').send({
//         firstname: ' Benjamin',
//         lastname: 'prehn@live.com',
//         password: 'thisisnotberynice'
//     }).expect(201)

    // Assert that the database was changed correctly
    // const user = await User.findById(response.body.user._id)
    // expect(user).not.toBeNull();

    // Assertions about the response
    // expect(response.body.user.firstname).toBe('Benjamin')

    // expect(response.body).toMatchObject({
    //     user: {
    //         firstname: 'Benjamin',
    //         email: 'test@test.com'
    //     },
    //     token: user.tokens[0].token
    // });

    // expect(user.password).not.toBe('WhatinTheWorldIsGoingOn')
// });

test('Should login exisitng user', async () => {
    const response = await request(app).post('/users/login').send({
        email: userOne.email,
        password: userOne.password
    })

    const user = await User.findById(userOneId)
    expect(user.role).toBe('user')
    expect(user.lastname).toBe('Test')
    expect(user.password).not.toBe('WhatinTheWorldIsGoingOn')
});

test('Should not login nonexisting user', async () => {
    await request(app).post('/users/login').send({
        email: userOne.email,
        password: 'Thisisnotmypass'
    }).expect(400);
});

test('Should get profile for user', async () => {
    const response = await request(app)
    .get('/users/me')
    .set('auth_token', `${userOne.tokens[0].token}`)
    .send()
    .expect(302);

   //  console.log(userOne.tokens[0].token);
    console.log(response);

    // const user = await User.findById(userOneId)
    //     expect(response.body).toMatchObject({
    //     user: {
    //         firstname: 'Benjamin',
    //         email: 'test@test.com'
    //     },
    //     token: user.tokens[0].token
    // });
})