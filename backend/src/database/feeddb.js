const data = require('./mockdata.json');
const db = require('../../sequalize_pg');
const EventModel = require('../models').eventModel;

db
    .sync({ force: true })
    .then(() => {
        EventModel.bulkCreate(data);
    })
    .catch((error) => {
        console.log('Oh no! Something went wrong! ', error);
    });
