const db = require('../sequalize_pg');
const Sequelize = require('sequelize');

const model = db.define('users', {
    username: Sequelize.STRING,
    phoneNumber: {
        type: Sequelize.STRING,
        unique: true,
    },
    pin: Sequelize.INTEGER,
    token: Sequelize.STRING,
    phoneNumberConfirmed: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
    },
    balance: {
        type: Sequelize.DOUBLE,
        defaultValue: '100',
    },
});

module.exports = model;
