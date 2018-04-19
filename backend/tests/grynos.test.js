const seed = require('../src/seed/db-seed');
const db = require('../src/db');
const datefns = require('date-fns');
const mockData = require('./testdata');
describe('getCourses API call', () => {
    beforeEach(() => {
        return seed.loadMockCoursesToDatabase();
    });

    test('should load course data', async () => {
        const courses = await db.courses.getCourses('2018-04-18', '2018-04-19');
        expect(courses).not.toBeNull();
        expect(courses).toHaveLength(4);
        const courseObj = courses[0];
        expect(courseObj.name).toEqual('English Conversation');
        expect(courseObj.price).toEqual(43);
        expect(courseObj.location).toHaveLength(1);
        expect(courseObj.teachingSession).toHaveLength(1);
    });

    test('validate the map reduce fucntion', () => {
        const response = db.courses.reduceCoursesByDate(mockData.courses);
        const responseObj = response['04-18-2018'][0];
        expect(response['04-18-2018']).toHaveLength(4);
        expect(responseObj.name).toEqual('English Conversation');
        expect(responseObj.price).toEqual(43);
        expect(responseObj.location).toEqual('Tapiola, Vindängens skola');
        expect(responseObj.startDate).toEqual('2018-04-18T07:00:00.000Z');
        expect(responseObj.endDate).toEqual('2018-04-18T08:30:00.000Z');
    });
});
