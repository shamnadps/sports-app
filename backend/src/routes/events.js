const express = require('express');
const models = require('../models');
const router = express.Router();

router.get('/:id', (req, res) => {
    res.send('returning singe event ' + req.params.id);
});

router.get('/', (req, res) => {
    models.events.findAll({}).then((events) => {
        res.status(200).send(events);
    });
});

module.exports = router;
