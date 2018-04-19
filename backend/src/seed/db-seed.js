const data = require('./mockdata.json');
const db = require('../sequalize_pg');
const models = require('../models');
const mapCourseFromGrynos = require('../grynos').mapCourseFromGrynos;

const loadMockCoursesToDatabase = async () => {
    try {
        await db.sync({ force: true });
        data.course.map(mapCourseFromGrynos).forEach((course) => {
            models.courses.create(
                course,
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
module.exports = { loadMockCoursesToDatabase };
