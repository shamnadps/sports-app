const express = require('express');
const router = express.Router();

router.use('/events', require('./events'));
router.use('/users', require('./users'));
router.use('/courses', require('./courses'));
router.use('/reservations', require('./reservations'));

router.get('*', (req, res) => {
    res.sendStatus(404);
});

module.exports = router;
