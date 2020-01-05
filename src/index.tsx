import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';

import React from 'react';
import ReactDOM from 'react-dom';
import WebFontLoader from 'webfontloader';
import './index.scss';

WebFontLoader.load({
    google: {
        families: ['Roboto:300,400,500,700', 'Material Icons'],
    },
});


(async () => {
    const AppModule = await import('./components/app');
    ReactDOM.render(<AppModule.App />, document.getElementById('root'))
})();