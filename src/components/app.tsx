import * as React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Header } from './structure/header';
import { Navigation } from './structure/navigation';
import { AppRouter } from './structure/router';

export const App: React.FunctionComponent = () => (
    <BrowserRouter>
        <div className="app">
            <header><Header /></header>
            <nav><Navigation /></nav>
            <main><AppRouter /></main>
        </div>
    </BrowserRouter>
);