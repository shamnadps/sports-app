import content from './content.json';
import { observable, computed, decorate } from 'mobx';

// this is a store of worded content, for internationalization
class I18NStore {
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

decorate(I18NStore, {
    language: observable,
    content: computed,
});

export default I18NStore;
