const data = require('./mockdata.json');
const db = require('../sequalize_pg');
const models = require('../models');

db.sync({ force: true })
    .then(() => {
        models.events.bulkCreate(data);
    })
    .catch((error) => {
        console.error('Creating the mock data failed. See the attached error for details. ', error);
    });
