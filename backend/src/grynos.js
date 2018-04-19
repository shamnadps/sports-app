const db = require('./sequalize_pg');
const axios = require('axios');
const models = require('./grynos');

const url =
    process.env.GRYNOS_COURSE_API_URL ||
    'https://colosseum.grynos.com/ilmoapix/v1/course/search?com=3,6&cgt=176';

const mapCourseFromGrynos = (course) => ({
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
    teachingSession: course.teachingSession,
    location: course.location,
});

const fetchCourses = async () => {
    try {
        const response = await axios(url);
        await db.sync({ force: true });
        return response.data.course.map((course) => mapCourseFromGrynos(course));
    } catch (error) {
        console.error(
            'Fetching the Grynos courses failed. See the attached error for details. ',
            error
        );
    }
};

const updateCoursesToDb = async () => {
    const courses = await fetchCourses();
    courses.forEach((course) => {
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
};

module.exports = { mapCourseFromGrynos, fetchCourses, updateCoursesToDb };
