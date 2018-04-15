const data = require('./mockdata.json');
const db = require('../../sequalize_pg');
const fetch = require('node-fetch');
const EventModel = require('../models').eventModel;

const createMockData = db
    .sync({ force: true })
    .then(() => {
        EventModel.bulkCreate(data);
    })
    .catch((error) => {
        console.log('Oh no! Something went wrong! ', error);
    });

module.exports = createMockData;
