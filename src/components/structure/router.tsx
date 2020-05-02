import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { navItems } from 'src/routes';

export const AppRouter: React.FunctionComponent = React.memo(() => (
    <React.Suspense fallback={<p>I&apos;m loading here</p>}>
        <Switch>
            {React.Children.toArray(
                navItems.map(({ to, exact, component }) => <Route path={to} exact={exact} component={component} />)
            )}
        </Switch>
    </React.Suspense>
));
