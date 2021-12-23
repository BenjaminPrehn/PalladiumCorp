const request = require('supertest');
const app = require('../app');
const User = require('../src/models/users');
const { userAdminId, userAdmin, userNotAdminId, userNotAdmin, setupDatabase } = require('./fixtures/db');

beforeEach(setupDatabase);

test('Should login exisitng user', async () => {
    const response = await request(app).post('/users/login').send({
        email: userAdmin.email,
        password: userAdmin.password
    })

    const user = await User.findById(userAdminId)
    expect(user.role).toBe('admin')
    expect(user.lastname).toBe('Test')
    expect(user.password).not.toBe('WhatinTheWorldIsGoingOn')
});

test('Should not login nonexisting user', async () => {
    await request(app).post('/users/login').send({
        email: userAdmin.email,
        password: 'Thisisnotmypass'
    }).expect(400);
});

test('Should get profile for logged in user', async () => {
    const response = await request(app)
    .get('/users/me')
    .set('Cookie', [`auth_token=${userAdmin.tokens[0].token}`])
    .send()
    .expect(200);

    const user = await User.findById(userAdminId)
        expect(response.body.firstname).toBe('Admin');
});

test('Should not get profile for unauthenticated user', async () => {
    response = await request(app)
        .get('/users/me')
        .set('Cookie', [])
        .send()
        .expect(302)
})

test('Should update user profile', async () => {
    response = await request(app)
        .post('/users/userUpdate')
        .set('Cookie', [`auth_token=${userAdmin.tokens[0].token}`])
        .send({
            firstname: 'Theis'
        })
     .expect(302)
    const user = await User.findById(userAdminId)
    expect(user.firstname).toEqual('Theis')
})

// test('Should create a new employee', async () => {
//     const response = await request(app)
//         .post('/employees/create')
//         .set('Cookie', [`auth_token=${userAdmin.tokens[0].token}`])
//         .send({
//              firstname: 'Benjamin',
//              lastname: 'Prehn',
//              email: 'prehn@live.com',
//              password: 'thisisnotberynice'
//     })
//     //.expect(201)
//     console.log(response);
//     // Assert that the database was changed correctly
//     // const user = await User.findById(response.body.user._id)
//     // expect(user).not.toBeNull();

//     // Assertions about the response
//     // expect(response.body.user.firstname).toBe('Benjamin')

//     // expect(response.body).toMatchObject({
//     //     user: {
//     //         firstname: 'Benjamin',
//     //         email: 'test@test.com'
//     //     },
//     //     token: user.tokens[0].token
//     // });

//     // expect(user.password).not.toBe('WhatinTheWorldIsGoingOn')
// });



