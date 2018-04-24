import { inject, observer } from 'mobx-react';
import fiLocale from 'date-fns/locale/fi';
import stores from '../stores';

export const connect = (...stores) => (component) => {
    return inject(...stores)(observer(component));
};

export const getLocale = () => {
    if (stores.contentStore.language === 'fi') return fiLocale;
    // add cases for swedish later
};
