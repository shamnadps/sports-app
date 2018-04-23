module.exports = {
    validateCourseId: (courseId) => {
        if (typeof courseId !== 'number' || isNaN(courseId)) {
            return 'Course Id is not valid';
        }
    },
};
