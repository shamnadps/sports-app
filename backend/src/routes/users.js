const express = require('express');
const router = express.Router();
const models = require('../models');

router.get('/:id', (req, res) => {
    res.send('returning specific user ' + req.params.id);
});

router.get('/', (req, res) => {
    models.users.findAll({}).then(function(users) {
        res.status(200).send(users);
    });
});

module.exports = router;
