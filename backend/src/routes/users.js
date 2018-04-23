const auth = require('../auth');
const express = require('express');
const router = express.Router();
const models = require('../models');
const db = require('../db');
const utils = require('../utils');
const randtoken = require('rand-token');

const getUser = async (req, res) => {
    try {
        const phoneNumber = req.query.phoneNumber;
        const validationErrors = utils.users.validateUserPhone(phoneNumber);
        if (validationErrors) {
            res.status(420).send(validationErrors);
        } else {
            const user = await db.users.getUser(phoneNumber);
            res.status(200).send(user);
        }
    } catch (err) {
        res.status(500).send(`Failed to get user. Error: ${err.message}`);
    }
};

const updateUser = async (req, res) => {
    try {
        const user = req.body;
        const validationErrors = utils.users.validateUserObj(user);
        if (validationErrors) {
            res.status(420).send(validationErrors);
        } else {
            const authUser = req.user;
            await db.users.updateUser(user, authUser.phoneNumber);
            res.status(200).send('Updated user details');
        }
    } catch (err) {
        res
            .status(500)
            .send(`Failed to update user details. Error: ${err.message}`);
    }
};

const deleteUser = async (req, res) => {
    try {
        const user = req.user;
        const validationErrors = utils.users.validateUserPhone(
            user.phoneNumber
        );
        if (validationErrors) {
            res.status(420).send(validationErrors);
        } else {
            await db.users.deleteUser(user.phoneNumber);
            res.status(200).send('Deleted user');
        }
    } catch (err) {
        res.status(500).send(`Failed to delete user. Error: ${err.message}`);
    }
};

const createUser = async (req, res) => {
    try {
        const user = req.body;
        const validationErrors = utils.users.validateUserObj(user);
        if (validationErrors) {
            res.status(420).send(validationErrors);
        } else {
            const token = randtoken.generate(16);
            user.token = token;
            await db.users.createUser(user);
            res.status(201).send(user);
        }
    } catch (err) {
        res
            .status(500)
            .send(`Failed to create new user. Error: ${err.message}`);
    }
};

const login = async (req, res) => {
    try {
        const phoneNumber = req.body.phoneNumber;
        const pin = req.body.pin;
        const validationErrors = utils.users.validateUserPhoneAndPin(
            phoneNumber,
            pin
        );
        if (validationErrors) {
            res.status(420).send(validationErrors);
        } else {
            const user = await db.users.getUserByPhoneAndPin(phoneNumber, pin);
            if (user) {
                res.status(200).send(user);
            } else {
                res.status(401).send('Phone number or pin is incorrect!.');
            }
        }
    } catch (err) {
        res.status(500).send(`Failed to login. Error: ${err.message}`);
    }
};

router.post('/', createUser);
router.put('/me', auth.requireAuth, updateUser);
router.get('/:phoneNumber', auth.requireAuth, getUser);
router.delete('/me', auth.requireAuth, deleteUser);
router.post('/login', login);

module.exports = router;
