const request = require('supertest');
const app = require('../app');
const Accounts = require('../src/models/account');
const { userAdminId, userAdmin, userNotAdminId, userNotAdmin, accountOne, accountTwo, accountThree, setupDatabase } = require('./fixtures/db');

beforeEach(setupDatabase);

test('Should create a new account', async () => {
    const response = await request(app)
        .post('/accounts')
        .set('Cookie', [`auth_token=${userAdmin.tokens[0].token}`])
        .send({
            network: 'Test Network',
            username: 'mail@mail.com',
            password: 'thisisapassword'
        })
        .expect(302)
    // console.log(response);
    // const account = await Accounts.findById(response.body._id)
    // console.log(account);
    // expect(account).not.toBeNull()
});

test('Should get account by its id', async () => {
    const response = await request(app)
    .get(`/accounts/${accountOne._id}`)
    .set('Cookie', [`auth_token=${userNotAdmin.tokens[0].token}`])
    .send()
    .expect(200)

    console.log(response.body);
    expect(response.body.username).toBe('testing@test.com')
})

test('Should get all user accounts', async () => {
    const response = await request(app)
    .get('/accounts/all')
    .set('Cookie', [`auth_token=${userNotAdmin.tokens[0].token}`])
    .send()
    .expect(200)

    expect(response.body[0].network).toBe('Aff network')
    expect(response.body.length).toBe(2)
});

test('Should not delete account from other user', async () => {
    const response = await request(app)
    .delete(`/accounts/${accountOne._id}`) 
    .set('Cookie', [`auth_token=${userAdmin.tokens[0].token}`])
    .send()
    expect(404)

    const account = await Accounts.findById(accountOne._id)
    expect(account).not.toBeNull()
})

test('Should delete account from coorect id', async () => {
    const response = await request(app)
    .delete(`/accounts/${accountOne._id}`)
    .set('Cookie', [`auth_token=${userNotAdmin.tokens[0].token}`])
    .send()
    .expect(200)

    const account = await Accounts.findById(accountOne._id)
    expect(account).toBeNull()

});