import { inject, observer } from 'mobx-react';

export const connect = (store) => (component) => {
    return inject(store)(observer(component));
};
