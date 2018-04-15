const data = require('./mockdata.json');
const db = require('../../sequalize_pg');
const fetch = require('node-fetch');
const models = require('../models');

const url =
    process.env.COURSE_API_URL ||
    'https://colosseum.grynos.com/ilmoapix/v1/course/search?com=3,6&cgt=176';

const fetchCourses = async () => {
    try {
        let response = await fetch(url);
        response = await response.json();
        await db.sync({ force: true });
        response.course.forEach((course) => {
            models.courses.create(course, {
                include: [{ model: models.locations, as: 'location' }],
            });
        });
    } catch (error) {
        console.log('Oh no! Something went wrong! ', error);
    }
};

setInterval(fetchCourses, process.env.COURSE_UPDATE_INTERVAL);

module.exports = fetchCourses;
