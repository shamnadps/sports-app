const db = require('../../sequalize_pg');
const Sequelize = require('sequelize');

const model = db.define('Users', {
    username: Sequelize.STRING,
});

module.exports = model;
