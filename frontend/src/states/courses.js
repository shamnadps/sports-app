import { decorate, observable, action } from 'mobx';
import mockCourse from './course-mock.json';
import dateFns from 'date-fns';

//@TODO: Persist this date to local storage, and hydrate it upon startup
class CourseStore {
    courseList = [];
    isFetchingCourses = true;
    useMockCourse = false;
    filters = {
        date: new Date(), // today
    };
    courseInFocus;

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
            this.courseList = mockCourse;
            this.useMockCourse = true;
        }
        this.isFetchingCourses = false;
    }

    getCourses() {
        if (this.isFetchingCouses) return [];
        if (this.filters.date) {
            const key = dateFns.format(this.filters.date, 'MM-DD-YYYY');
            const filtered = this.courseList[key];
            return filtered || [];
        }
        return this.courseList;
    }

    setFilters(filters) {
        this.filters = filters;
    }

    selectCourse(course) {
        this.courseInFocus = course;
    }
}

export default decorate(CourseStore, {
    courseList: observable.deep,
    isFetchingCourses: observable,
    fetchCourse: action.bound,
    courseInFocus: observable,
    filters: observable,
    useMockCourse: observable,
});
