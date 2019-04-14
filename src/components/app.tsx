import * as React from 'react';
import { Navigation } from './structure/navigation';
import { Header } from './structure/header';
import { BrowserRouter } from 'react-router-dom';
import { AppRouter } from './structure/router/router';
import { AppContext, defaultAppContext } from '../app.context';

interface AppProps {
    props?: any;
}

class AppComponent extends React.Component<AppProps> {
    public render() {
        return (
            <AppContext.Provider value={defaultAppContext}>
                <BrowserRouter>
                    <div className="app">
                        <Header />
                        <Navigation />
                        <main>
                            <AppRouter />
                        </main>
                    </div>
                </BrowserRouter>
            </AppContext.Provider>
        );
    }
}

export const App = AppComponent;