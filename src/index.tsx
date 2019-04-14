import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import { initilizeConfiguration } from './configuration';
import WebFontLoader from 'webfontloader';
import './index.scss';

WebFontLoader.load({
    google: {
        families: ['Roboto:300,400,500,700', 'Material Icons'],
    },
});

initilizeConfiguration()
.then(() => import('./components/app'))
.then(AppModule => ReactDOM.render(<AppModule.App />, document.getElementById('root')));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();