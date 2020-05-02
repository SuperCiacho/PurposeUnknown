import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AppLayout } from './structure/layout';
import { AppRouter } from './structure/router';

export const App: React.FunctionComponent = () => (
    <BrowserRouter>
        <AppLayout>
            <AppRouter />
        </AppLayout>
    </BrowserRouter>
);
