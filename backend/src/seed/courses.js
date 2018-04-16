const data = require('./mockdata.json');
const db = require('../../sequalize_pg');
const axios = require('axios');
const models = require('../models');

const url =
    process.env.COURSE_API_URL ||
    'https://colosseum.grynos.com/ilmoapix/v1/course/search?com=3,6&cgt=176';

const fetchCourses = async () => {
    try {
        const response = await axios(url);
        await db.sync({ force: true });
        response.data.course.forEach((course) => {
            models.courses.create(
                {
                    id: course.id,
                    code: course.code,
                    description: course.description,
                    descriptionInternet: course.descriptionInternet,
                    price: course.price,
                    priceMaterial: course.priceMaterial,
                    firstSessionDate: course.firstSession,
                    firstSessionWeekDay: course.firstSessionWeekdate,
                    lastSessionDate: course.lastSession,
                    internetEnrollment: course.internetEnrollment,
                    minStudentCount: course.minStudentCount,
                    maxStudentCount: course.maxStudentCount,
                    firstEnrollmentDate: course.firstEnrollmentDate,
                    lastEnrollmentDate: course.lastEnrollmentDate,
                    acceptedCount: course.acceptedCount,
                    ilmokink: course.ilmokink,
                    teachingSession: course.teachingSession,
                    location: course.location,
                },
                {
                    include: [{ model: models.locations, as: 'location' }],
                }
            );
        });
    } catch (error) {
        console.log('Oh no! Something went wrong! ', error);
    }
};

setInterval(fetchCourses, process.env.COURSE_UPDATE_INTERVAL);

module.exports = fetchCourses;
