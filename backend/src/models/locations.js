const db = require('../sequalize_pg');
const Sequelize = require('sequelize');

const model = db.define('locations', {
    path: Sequelize.TEXT,
    address: Sequelize.TEXT,
});

module.exports = model;
