const express = require('express');
const router = express.Router();
const models = require('../models');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
var datefns = require('date-fns');

router.get('/:id', (req, res) => {
    res.send('returning singe course ' + req.params.id);
});

router.get('/', (req, res) => {
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
                },
            ],

            validate: false,
        })
        .then(function(courses) {
            let result = courses.map((course) => ({
                name: course.name,
                price: course.price,
                location: course.location[0].dataValues.location,
                startDate: course.teachingSession[0].dataValues.startDate,
                endDate: course.teachingSession[0].dataValues.endDate,
            }));

            const response = result.reduce((array, course) => {
                const date = datefns.format(course.startDate, 'MM-DD-YYYY');
                array[date] = array[date] || [];
                array[date].push(course);
                return array;
            }, {});

            res.status(200).send(response);
        });
});

router.get('/:startDate/:endDate', (req, res) => {
    const startDate = datefns.format(
        datefns.parse(Number(req.params.startDate)),
        'MM-DD-YYYY'
    );

    const endDate = datefns.format(
        datefns.parse(Number(req.params.endDate)),
        'MM-DD-YYYY'
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
        .then(function(courses) {
            let result = courses.map((course) => ({
                name: course.name,
                price: course.price,
                location: course.location[0].dataValues.location,
                startDate: course.teachingSession[0].dataValues.startDate,
                endDate: course.teachingSession[0].dataValues.endDate,
            }));

            const response = result.reduce((array, course) => {
                const date = datefns.format(course.startDate, 'MM-DD-YYYY');
                array[date] = array[date] || [];
                array[date].push(course);
                return array;
            }, {});

            res.status(200).send(response);
        });
});

module.exports = router;
