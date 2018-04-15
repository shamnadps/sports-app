const express = require('express');
const router = express.Router();
const models = require('../models');

router.get('/:id', (req, res) => {
    res.send('returning singe event ' + req.params.id);
});

router.get('/', (req, res) => {
    models.events.findAll({}).then(function(events) {
        res.status(200).send(events);
    });
});

module.exports = router;
