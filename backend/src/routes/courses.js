const express = require('express');
const router = express.Router();
const models = require('../models');
const Sequelize = require('sequelize');
const datefns = require('date-fns');
const Op = Sequelize.Op;

router.get('/', (req, res) => {
    const timestampToDate = date => datefns.parse(Number(date), 'MM-DD-YYYY');
    const toFormattedDate = date => datefns.format(date);

    // Default start and end date for the last week
    const startDate = toFormattedDate(
        req.query.startDate ? timestampToDate(req.query.startDate) : new Date()
    );
    const endDate = toFormattedDate(
        req.query.endDate ? timestampToDate(req.query.endDate) : datefns.addWeeks(new Date(), 1)
    );

    models.courses
        .findAll({
            attributes: ['name', 'price'],
            include: [
                {
                    model: models.locations,
                    as: 'location',
                    attributes: [['path', 'location']],
                },
                {
                    model: models.events,
                    as: 'teachingSession',
                    attributes: [['start', 'startDate'], ['end', 'endDate']],
                    where: {
                        start: { [Op.between]: [startDate, endDate] },
                    },
                },
            ],

            validate: false,
        })
        .then(function (courses) {
            const response = courses.map((course) => ({
                name: course.name,
                price: course.price,
                location: course.location[0].dataValues.location,
                startDate: course.teachingSession[0].dataValues.startDate,
                endDate: course.teachingSession[0].dataValues.endDate,
            })).reduce((obj, course) => {
                const date = datefns.format(course.startDate, 'MM-DD-YYYY');
                obj[date] = obj[date] || [];
                obj[date].push(course);
                return obj;
            }, {});

            res.status(200).send(response);
        });
});

router.get('/:id', (req, res) => {
    res.send('returning singe course ' + req.params.id);
});

module.exports = router;
