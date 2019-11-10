import * as React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AppContext, defaultAppContext } from '../app.context';
import { Header } from './structure/header';
import { Navigation } from './structure/navigation';
import { AppRouter } from './structure/router';

export const App: React.FunctionComponent = props => (
        <AppContext.Provider value={defaultAppContext}>
            <BrowserRouter>
                <div className="app">
                    <header><Header /></header>
                    <nav><Navigation /></nav>
                    <main>
                        <AppRouter />
                        {/* <Parent /> */}
                    </main>
                </div>
            </BrowserRouter>
        </AppContext.Provider>
);