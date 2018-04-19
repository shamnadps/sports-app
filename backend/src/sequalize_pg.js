const Sequelize = require('sequelize');
let connectionString;
if (process.env.DATABASE_URL) {
    connectionString = process.env.DATABASE_URL;
} else {
    const { USERNAME, PASSWORD, HOST, DATABASE } = process.env;
    connectionString = `postgres://${USERNAME}:${PASSWORD}@${HOST}:5432/${DATABASE}`;
}
const Op = Sequelize.Op;
const sequelize = new Sequelize(connectionString, {
    operatorsAliases: Op,
});

module.exports = sequelize;
