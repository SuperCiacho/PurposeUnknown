import React, { memo } from 'react';
import { Route, Switch } from 'react-router-dom';

export const navItems = [
  { label: 'Currency exchange', to: '/', exact: true, icon: 'money' },
  { label: 'Starred', to: `/starred`, icon: 'star' },
  { label: 'Settings', to: `/settings`, icon: 'cob' }
];

const Content = React.lazy(() => import('../content').then(x => ({ default: x.Content })))

export const AppRouter: React.FunctionComponent = memo(() => (
  <Switch>
    {navItems.map(x => <React.Suspense fallback={<p>`I'm loading ${x.label} here`</p>}><Route key={x.label} path={x.to} exact={x.exact} component={Content} /></React.Suspense>)}
  </Switch>
));