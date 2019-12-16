import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Navigation } from './structure/navigation';
import { AppRouter } from './structure/router';

export const App: React.FunctionComponent = () => (
    <BrowserRouter>
        <Navigation>
            <AppRouter />
        </Navigation>
    </BrowserRouter >
);