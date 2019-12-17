import React from 'react';
import { Route, Switch } from 'react-router-dom';

const Exchange = React.lazy(() => import('../exchange').then(x => ({ default: x.Exchange })))
const Directory = React.lazy(() => import('../directory').then(x => ({ default: x.Directory })))
const Settings = React.lazy(() => import('../settings').then(x => ({ default: x.Settings })))

export const navItems = [
  { label: 'Currency exchange', component: Exchange, to: '/', icon: 'money', exact: true, },
  { label: 'Directory', component: Directory, to: `/directory`, icon: 'star' },
  { label: 'Settings', component: Settings, to: `/settings`, icon: 'cob' },
];

export const AppRouter: React.FunctionComponent = React.memo(() => (
  <React.Suspense fallback={<p>I'm loading here</p>}>
    <Switch>
      {navItems.map(({ to, exact, component }, ix) => <Route key={ix} path={to} exact={exact} component={component} />)}
    </Switch>
  </React.Suspense>
));