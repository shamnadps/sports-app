const express = require('express');
const router = express.Router();
const models = require('../models');

router.get('/:id', (req, res) => {
    res.send('returning singe course ' + req.params.id);
});

router.get('/', (req, res) => {
    models.courses
        .findAll({
            include: [{ model: models.locations, as: 'location' }],
            validate: false,
        })
        .then(function(courses) {
            res.status(200).send(courses);
        });
});

module.exports = router;
