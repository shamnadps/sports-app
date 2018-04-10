const db = require('../../sequalize_pg');
const Sequelize = require('sequelize');

const model = db.define('Events', {
    title: Sequelize.STRING,
});

module.exports = model;
