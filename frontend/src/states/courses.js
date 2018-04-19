import dateFns from 'date-fns';
import { action, decorate, observable } from 'mobx';
import mockCourses from './course-mock.json';

//@TODO: Persist this date to local storage, and hydrate it upon startup
class CourseStore {
    courseList = [];
    isFetchingCourses = true;
    useMockCourse = false;

    constructor() {
        this.fetchCourses();
    }

    async fetchCourses(startDate = Date.now()) {
        this.isFetchingCourses = true;

        try {
            const response = await window.fetch(
                `/api/courses?startDate=${startDate}`
            );
            const data = await response.json();
            this.useMockCourse = false;
            this.courseList = data;
        } catch (error) {
            console.log(error);
            this.courseList = mockCourses;
            this.useMockCourse = true;
        }
        this.isFetchingCourses = false;
    }

    getCourses(date) {
        if (this.isFetchingCourses) {
            return [];
        }
        if (date) {
            const key = dateFns.format(date, 'MM-DD-YYYY');
            if (!this.courseList.hasOwnProperty(key)) {
                return [];
            }
            return this.courseList[key];
        }
        return this.courseList;
    }
}

export default decorate(CourseStore, {
    courseList: observable.deep,
    isFetchingCourses: observable,
    fetchCourse: action.bound,
});
