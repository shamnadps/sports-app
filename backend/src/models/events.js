const db = require('../sequalize_pg');
const Sequelize = require('sequelize');

const model = db.define('events', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
    },
    start: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
    },
    end: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
    },
    teachingplace: Sequelize.TEXT,
    address: Sequelize.STRING,
    description: Sequelize.STRING,
    status: Sequelize.INTEGER,
});

module.exports = model;
