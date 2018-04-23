const db = require('../sequalize_pg');
const Sequelize = require('sequelize');

const model = db.define('users', {
    username: Sequelize.STRING,
    phoneNumber: {
        type: Sequelize.STRING,
        primaryKey: true,
    },
    pin: Sequelize.INTEGER,
    token: Sequelize.STRING,
    phoneNumberConfirmed: Sequelize.BOOLEAN,
});

module.exports = model;
