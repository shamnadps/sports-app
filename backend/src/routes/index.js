const express = require('express');
const server = express();
const router = express.Router();

router.get('/', (req, res) => {
    res.status(200).send('Welcome to PWA Vanta Project!.');
});

router.use('/events', require('./events'));
router.use('/users', require('./users'));
router.use('/courses', require('./courses'));

router.get('*', (req, res) => {
    res.sendStatus(404);
});

module.exports = router;
