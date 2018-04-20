import content from './content.json';
import { observable, computed, decorate } from 'mobx';

// this is a store of worded content, for internationalization
class ContentStore {
    language = 'fi';
    get content() {
        switch (this.language.toLowerCase()) {
            case 'sv':
                return content.swedish;
            case 'en':
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
