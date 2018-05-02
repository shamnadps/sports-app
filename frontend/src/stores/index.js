import I18NStore from './i18n';
import userStore from './user';
import courseStore from './courses';

class RootStore {
    constructor() {
        this.userStore = new userStore(this);
        this.courseStore = new courseStore(this);
        this.i18nStore = new I18NStore(this);
    }
}
export default new RootStore();
