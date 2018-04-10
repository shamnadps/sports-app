const express = require('express');
const router = express.Router();
const models = require('../models');

router.get('/getEvent', (req, res) => {
    res.send('returning singe event');
});

router.post('/addEvent', (req, res) => {
    res.send('Created the event');
});

router.get('/getAllEvents', (req, res) => {
    models.eventModel.findAll({}).then(function(events) {
        res.status(200).send(events);
    });
});

module.exports = router;
