const express = require('express');
const router = express.Router();

router.get('/getUser', (req, res) => {
    res.send('returning singe user');
});

router.post('/addUser', (req, res) => {
    res.send('Created User');
});

router.get('/getAllUsers', (req, res) => {
    res.send('returning user list');
});

module.exports = router;
