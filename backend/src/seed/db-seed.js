const data = require('./mockdata.json');
const db = require('../sequalize_pg');
const models = require('../models');

const loadMockCoursesToDatabase = async () => {
    try {
        await db.sync({ force: true });
        data.course.forEach((course) => {
            models.courses.create(
                {
                    id: course.id,
                    code: course.code,
                    name: course.name,
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
                    location: course.location,
                    teachingSession: course.teachingSession,
                },
                {
                    include: [
                        { model: models.locations, as: 'location' },
                        { model: models.events, as: 'teachingSession' },
                    ],
                }
            );
        });
    } catch (error) {
        console.log('Oh no! Something went wrong! ', error);
    }
};
loadMockCoursesToDatabase();
module.exports = { loadMockCoursesToDatabase };
