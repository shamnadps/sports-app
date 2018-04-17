import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from 'emotion-theming';
import { ContentStore, UserStore } from './states';
import { Provider } from 'mobx-react';
import { BrowserRouter } from 'react-router-dom';

import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

const theme = {
    signInBackGround: {
        color1: '#3F8EDB',
        color2: '#183552',
    },
    main: '#3F8EDB',
};

const Root = () => (
    <Provider ContentStore={new ContentStore()} UserStore={new UserStore()}>
        <BrowserRouter>
            <ThemeProvider theme={theme}>
                <App />
            </ThemeProvider>
        </BrowserRouter>
    </Provider>
);
ReactDOM.render(<Root />, document.getElementById('root'));
registerServiceWorker();
