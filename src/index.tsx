import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';

import React from 'react';
import ReactDOM from 'react-dom';
import WebFontLoader from 'webfontloader';
import './index.scss';

WebFontLoader.load({
    google: {
        families: ['Roboto:300,400,500,700', 'Material Icons']
    }
});

import('./components/app').then(({ App }) => {
    ReactDOM.render(<App />, document.getElementById('root'));
});
