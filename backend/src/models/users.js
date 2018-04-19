const db = require('../sequalize_pg');
const Sequelize = require('sequelize');

const model = db.define('users', {
    username: Sequelize.STRING,
});

module.exports = model;
