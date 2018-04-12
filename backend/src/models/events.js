const db = require('../../sequalize_pg');
const Sequelize = require('sequelize');

const model = db.define('Events', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
    },
    name: Sequelize.STRING,
    description: Sequelize.TEXT,
    time: Sequelize.DATEONLY,
    location: Sequelize.STRING,
    ticket_left: {
        type: Sequelize.INTEGER,
    },
});

module.exports = model;
