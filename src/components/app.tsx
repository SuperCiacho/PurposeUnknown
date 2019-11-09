import * as React from 'react';
import { Navigation } from './structure/navigation';
import { Header } from './structure/header';
import { BrowserRouter } from 'react-router-dom';
import { AppRouter } from './structure/router/router';
import { AppContext, defaultAppContext } from '../app.context';
import { Parent } from './content/async-component';

interface AppProps {
}

export const App: React.FunctionComponent = props => (
    <AppContext.Provider value={defaultAppContext}>
        <BrowserRouter>
            <div className="app">
                <Header />
                <Navigation />
                <main>
                    {/* <AppRouter /> */}
                    <Parent />
                </main>
            </div>
        </BrowserRouter>
    </AppContext.Provider>
);