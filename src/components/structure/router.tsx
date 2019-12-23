import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { navItems } from 'src/routes';

export const AppRouter: React.FunctionComponent = React.memo(() => (
  <React.Suspense fallback={<p>I'm loading here</p>}>
    <Switch>
      {navItems.map(({ to, exact, component }, ix) => <Route key={ix} path={to} exact={exact} component={component} />)}
    </Switch>
  </React.Suspense>
));