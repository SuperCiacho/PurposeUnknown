import * as React from 'react';
import { Route, Switch, RouteComponentProps, withRouter } from 'react-router-dom';
import { Content } from '../../content/content';

export const navItems = [{
  label: 'Inbox',
  to: '/',
  exact: true,
  icon: 'inbox',
}, {
  label: 'Starred',
  to: `/starred`,
  icon: 'star',
}, {
  label: 'Send mail',
  to: `/send-mail`,
  icon: 'send',
}, {
  label: 'Drafts',
  to: `/drafts`,
  icon: 'drafts',
}];


interface AppRouterProps extends RouteComponentProps<{}> {
}

const AppRouterComponent: React.FunctionComponent<AppRouterProps> = (props) => (
  <Switch key={props.location.pathname}>
    {navItems.map(x => <Route key={x.label} path={x.to} exact={x.exact} component={Content} />)}
  </Switch>
);

export const AppRouter = withRouter(AppRouterComponent); 