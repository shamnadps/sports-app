const express = require('express');
const router = express.Router();

router.get('/getUser', (req, res) => {
    res.status(200).send(users);
});

router.post('/addUser', (req, res) => {
    res.send('Created User');
});

router.post('/getAllUsers', (req, res) => {
    res.send('Created User');
});

module.exports = router;
