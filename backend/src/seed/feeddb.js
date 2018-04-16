const data = require('./mockdata.json');
const db = require('../../sequalize_pg');
const fetch = require('node-fetch');
const models = require('../models');

const createMockData = db
    .sync({ force: true })
    .then(() => {
        models.events.bulkCreate(data);
    })
    .catch((error) => {
        console.log('Oh no! Something went wrong! ', error);
    });

module.exports = createMockData;
