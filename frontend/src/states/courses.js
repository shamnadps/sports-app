import { decorate, observable, action } from 'mobx';
import mockCourse from './course-mock.json';
import dateFns from 'date-fns';

//@TODO: Persist this date to local storage, and hydrate it upon startup
class CourseStore {
    courseList = [];
    isFetchingCouses = true;
    useMockCourse = false;
    filters = {
        date: new Date(), // today
    };

    constructor() {
        this.fetchCourse();
    }

    async fetchCourse(startDate = Date.now()) {
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

    getCourse() {
        if (this.isFetchingCouses) return [];
        if (this.filters.date) {
            const key = dateFns.format(this.filters.date, 'MM-DD-YYYY');
            const filtered = this.courseList[key];
            return filtered || [];
        }
        return this.courseList;
    }

    setFilter(filters) {
        this.filters = filters;
    }
}

export default decorate(CourseStore, {
    courseList: observable.deep,
    isFetchingCouses: observable,
    fetchCourse: action.bound,
    filters: observable,
});
