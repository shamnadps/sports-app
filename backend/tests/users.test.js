const randtoken = require('rand-token');
const db = require('../src/db');
const Sequelize = require('sequelize');
const utils = require('../src/utils');

describe('Users API testing.', () => {
    let token = randtoken.generate(16);
    let user = {
        username: 'test user',
        phoneNumber: '+358 1234535',
        pin: 1234,
        token: token,
    };
    test('should create user and get usr by token', async () => {
        await db.users.createUser(user);
        const dbuser = await db.users.getUserByToken(token);
        expect(dbuser).not.toBeNull();
        expect(dbuser.username).toEqual(user.username);
        expect(dbuser.phoneNumber).toEqual(user.phoneNumber);
        expect(dbuser.pin).toEqual(user.pin);
        expect(dbuser.token).toEqual(user.token);
    });

    test('should not create user with duplicate phone number', async () => {
        let error = 'No Errors';
        try {
            await db.users.createUser(user);
        } catch (err) {
            error = err;
        }
        expect(error.name).toEqual('SequelizeUniqueConstraintError');
        expect(error.message).toEqual('Validation error');
    });

    test('should update user and get user by phone and pin', async () => {
        user.username = 'test Updated';
        user.pin = 1232;
        user.token = token;

        await db.users.updateUser(user, user.phoneNumber);
        const dbuser = await db.users.getUserByPhoneAndPin(
            user.phoneNumber,
            user.pin
        );
        expect(dbuser).not.toBeNull();
        expect(dbuser.username).toEqual(user.username);
        expect(dbuser.phoneNumber).toEqual(user.phoneNumber);
        expect(dbuser.pin).toEqual(user.pin);
        expect(dbuser.token).toEqual(user.token);
    });

    test('delete user by phone', async () => {
        const phoneNumber = '+358 1234535';
        await db.users.deleteUser(phoneNumber);
        const dbuser = await db.users.getUser(phoneNumber);
        expect(dbuser).toBeNull();
    });

    test('check for valid phone numbers', () => {
        const phoneNumberInvalid = 'Phone number is not valid';
        expect(utils.users.validateUserPhone(30856)).toEqual(
            phoneNumberInvalid
        );
        expect(utils.users.validateUserPhone('sdstr')).toEqual(
            phoneNumberInvalid
        );
        expect(utils.users.validateUserPhone('123 123')).toEqual(
            phoneNumberInvalid
        );
        expect(utils.users.validateUserPhone('123')).toEqual(
            phoneNumberInvalid
        );
        expect(utils.users.validateUserPhone('+358503 085600')).toEqual(
            phoneNumberInvalid
        );
        expect(utils.users.validateUserPhone('+358503 ABC 085600')).toEqual(
            phoneNumberInvalid
        );
        expect(utils.users.validateUserPhone('+358 - 503 - 085600')).toEqual(
            phoneNumberInvalid
        );
        expect(utils.users.validateUserPhone('+(358)503 085600')).toEqual(
            phoneNumberInvalid
        );
        expect(utils.users.validateUserPhone('+3')).not.toEqual(
            phoneNumberInvalid
        );
        expect(utils.users.validateUserPhone('+358')).not.toEqual(
            phoneNumberInvalid
        );
        expect(utils.users.validateUserPhone('+1234545456')).not.toEqual(
            phoneNumberInvalid
        );
    });
});
