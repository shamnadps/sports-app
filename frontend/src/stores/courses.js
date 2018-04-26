import { decorate, observable, action, autorun } from 'mobx';
import mockCourse from './course-mock.json';
import dateFns from 'date-fns';

const isAvailableByTime = (courseItem) =>
    // within 3 days from now
    dateFns.differenceInDays(courseItem.startDate, new Date()) < 3 &&
    // and must not be 1 hours before starting time
    dateFns.differenceInHours(courseItem.startDate, new Date()) > 1;

const pluckId = (obj) => {
    const clone = [];
    Object.keys(obj).forEach((key) =>
        obj[key].forEach((item) => clone.push(item.id))
    );
    return clone;
};

const checkEvery5Sec = () => {
    window.setTimeout(() => {
        window.requestIdleCallback(() => {
            this.checkAvailability();
            checkEvery5Sec();
        });
    }, 5000);
};

class CourseStore {
    courseList = [];
    courseIdList = [];
    isFetchingCourses = true;
    useMockCourse = false;
    filters = {
        date: new Date(), // today
    };
    courseInFocus;

    constructor() {
        const checkEvery5Sec = () => {
            window.setTimeout(() => {
                window.requestIdleCallback(
                    () => {
                        this.checkAvailability();
                        checkEvery5Sec();
                    },
                    {
                        timeout: Infinity,
                    }
                );
            }, 5000);
        };

        this.fetchCourses();
        // schedule this checking every 5 seconds
        // when browser is idle, to avoid hagging resources for UI
        checkEvery5Sec();
    }

    // at the moment, this will check the availability regarding time constrains
    checkAvailability() {
        if (!this.courseList || this.courseList.length == 0) return;
        // loop throught courseList recursively
        // add an evaluation to the item
        Object.keys(this.courseList).forEach(
            (key) =>
                (this.courseList[key] = this.courseList[key].map(
                    (courseItem) =>
                        (courseItem = {
                            ...courseItem,
                            isAvailable: isAvailableByTime(courseItem),
                        })
                ))
        );
    }
    // This function is a behemoth. Find a way to make it only fetch
    // all side effect be handled elsewhere
    async fetchCourses(startDate = Date.now()) {
        const endDate = dateFns.addDays(startDate, 14).getTime();
        this.isFetchingCourses = true;

        try {
            const response = await window.fetch(
                `/api/courses?startDate=${startDate}&endDate=${endDate}`
            );
            const data = await response.json();
            this.useMockCourse = false;
            this.courseList = data;
            // as soon as the courses are available in store, we will apply check on them
            this.checkAvailability();
            this.courseIdList = pluckId(this.courseList);
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
    checkAvailability: action,
});
