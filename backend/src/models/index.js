const createevents = require('../database/tables/createEvents');

const eventModel = require('./events');
const userModel = require('./users');

module.exports = {
    eventModel: eventModel,
    userModel: userModel,
};
