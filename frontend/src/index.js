import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from 'emotion-theming';
import stores from './stores';
import { Provider } from 'mobx-react';
import { BrowserRouter } from 'react-router-dom';

import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

const theme = {
    signInBackground: 'rgb(60, 143, 222)',
    main: 'rgb(60, 143, 222)',
    complementary: 'rgb(249, 229, 30)',
    green: '#66BB6A',
    error: 'rgb(250, 66, 59)',
    errorReservationTime: 'rgb(117, 59, 189)',
    errorReservationResource: 'rgb(255, 143, 28)',
    errorReservationAuth: '#616161',
    errorReservationNoTicket: '#FA423B',
};
const { i18nStore, userStore, courseStore } = stores;
const Root = () => (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
        <Provider
            i18nStore={i18nStore}
            userStore={userStore}
            courseStore={courseStore}
        >
            <ThemeProvider theme={theme}>
                <App />
            </ThemeProvider>
        </Provider>
    </BrowserRouter>
);
ReactDOM.render(<Root />, document.getElementById('root'));
