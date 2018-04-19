const express = require('express');
const router = express.Router();
const db = require('../db');
const datefns = require('date-fns');

router.get('/', async (req, res) => {
    const timestampToDate = (date) => datefns.parse(Number(date), 'MM-DD-YYYY');
    const toFormattedDate = (date) => datefns.format(date);

    // Default start and end date for the last week
    const startDate = toFormattedDate(
        req.query.startDate ? timestampToDate(req.query.startDate) : new Date()
    );
    const endDate = toFormattedDate(
        req.query.endDate
            ? timestampToDate(req.query.endDate)
            : datefns.addWeeks(new Date(), 1)
    );

    const courses = await db.courses.getCourses(startDate, endDate);
    const response = db.courses.reduceCoursesByDate(courses);
    res.status(200).send(response);
});

router.get('/:id', (req, res) => {
    res.send('returning singe course ' + req.params.id);
});

module.exports = router;
