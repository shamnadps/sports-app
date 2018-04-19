import { decorate, observable, action, autorun } from 'mobx';
import mockCourse from './course-mock.json';
import dateFns from 'date-fns';

//@TODO: Persist this date to local storage, and hydrate it upon startup
class CourseStore {
    courseList = [];
    isFetchingCouses = true;
    useMockCourse = false;

    constructor() {
        this.fetchCourse();
    }

    async fetchCourse(startDate = Date.now()) {
        const host = window.location.host;
        const protocol = window.location.protocol;
        this.isFetchingCouses = true;

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
        this.isFetchingCouses = false;
    }
    getCourse(date) {
        if (this.isFetchingCouses) return [];
        if (date) {
            const key = dateFns.format(date, 'MM-DD-YYYY');
            const filtered = this.courseList[key];
            return filtered;
        }
        return this.courseList;
    }
}

export default decorate(CourseStore, {
    courseList: observable.deep,
    isFetchingCouses: observable,
    fetchCourse: action.bound,
});
