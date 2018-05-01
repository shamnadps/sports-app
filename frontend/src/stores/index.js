import ContentStore from './content-store';
import UserStore from './user';
import CourseStore from './courses';

const stores = {
    contentStore: new ContentStore(),
    userStore: new UserStore(),
    courseStore: new CourseStore(),
};
export default stores;
