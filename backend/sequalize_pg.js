const Sequelize = require('sequelize');
const { USERNAME, PASSWORD, HOST, DATABASE } = process.env;
const connectionString = `postgres://${USERNAME}:${PASSWORD}@${HOST}:5432/${DATABASE}`;
const Op = Sequelize.Op;
const sequelize = new Sequelize(connectionString, {
    operatorsAliases: Op,
});

module.exports = sequelize;
