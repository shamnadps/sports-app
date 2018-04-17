import content from './content.json';
import { observable, computed, decorate } from 'mobx';

// this is a store of worded content, for internationalization
class ContentStore {
    language = 'finnish';
    get content() {
        switch (this.language.toLowerCase()) {
            case 'swedish':
                return content.swedish;
            case 'english':
                return content.english;
            default:
                return content.finnish;
        }
    }
}

decorate(ContentStore, {
    language: observable,
    content: computed,
});

export default ContentStore;
