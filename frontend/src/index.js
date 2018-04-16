import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from 'emotion-theming';
import ContentStore from './content-store';
import { Provider } from 'mobx-react';

import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

const theme = {
    signInBackGround: {
        color1: '#3F8EDB',
        color2: '#183552',
    },
};

const Root = () => (
    <Provider ContentStore={new ContentStore()}>
        <ThemeProvider theme={theme}>
            <App />
        </ThemeProvider>
    </Provider>
);
ReactDOM.render(<Root />, document.getElementById('root'));
registerServiceWorker();
