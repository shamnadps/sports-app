import { inject, observer } from 'mobx-react';

export const connect = (...stores) => (component) => {
    return inject(...stores)(observer(component));
};
