const Sequelize = require('sequelize');
const { USERNAME, PASSWORD, HOST, DATABASE } = process.env;
const connectionString = `postgres://${USERNAME}:${PASSWORD}@${HOST}:5432/${DATABASE}`;

const sequelize = new Sequelize(connectionString);

module.exports = sequelize;
