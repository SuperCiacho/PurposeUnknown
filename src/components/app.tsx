import * as React from 'react';
import { Navigation } from './structure/navigation';
import { AppRouter } from './structure/router';

export const App: React.FunctionComponent = () => (
        <Navigation>
            <AppRouter />
        </Navigation>
);