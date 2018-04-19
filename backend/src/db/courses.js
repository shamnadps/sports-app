const models = require('../models');
const datefns = require('date-fns');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const getCourses = async (startDate, endDate) => {
    return await models.courses.findAll({
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
    });
};

const reduceCoursesByDate = (courses) => {
    return courses
        .map((course) => ({
            name: course.name,
            price: course.price,
            location: course.location[0].dataValues.location,
            startDate: course.teachingSession[0].dataValues.startDate,
            endDate: course.teachingSession[0].dataValues.endDate,
        }))
        .reduce((obj, course) => {
            const date = datefns.format(course.startDate, 'MM-DD-YYYY');
            obj[date] = obj[date] || [];
            obj[date].push(course);
            return obj;
        }, {});
};

module.exports = { getCourses, reduceCoursesByDate };
