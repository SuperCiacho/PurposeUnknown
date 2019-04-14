import * as React from 'react';
import { NavigationDrawer } from 'react-md/lib/NavigationDrawers';
import { navItems } from './router/router';
import { NavLink, withRouter, RouteComponentProps } from 'react-router-dom';

interface NavigationComponentProps extends RouteComponentProps<{}> {
}

interface NavigationComponentState {
    toolbarTitle: string;
}

class NavigationC extends React.Component<NavigationComponentProps, NavigationComponentState> {

    constructor(props: NavigationComponentProps) {
        super(props);
        this.state = { toolbarTitle: '' };
    }

    public componentWillReceiveProps(nextProps: NavigationComponentProps) {
        this.setState({ toolbarTitle: this.getCurrentTitle(nextProps) });
    }

    public getCurrentTitle(props: NavigationComponentProps) {
        const pathName = props.location.pathname;
        const lastSection = pathName.substring(pathName.lastIndexOf('/') + 1);
        if (lastSection === 'navigation-drawers') {
            return 'Inbox';
        }

        return lastSection;
    }

    public render() {
        const { toolbarTitle } = this.state;
        return (
            <nav>
                <NavigationDrawer
                    toolbarTitle={toolbarTitle}
                    mobileDrawerType={NavigationDrawer.DrawerTypes.TEMPORARY_MINI}
                    tabletDrawerType={NavigationDrawer.DrawerTypes.PERSISTENT_MINI}
                    desktopDrawerType={NavigationDrawer.DrawerTypes.PERSISTENT_MINI}
                    navItems={navItems.map(props => <NavLink {...props} key={props.to} />)}
                />
            </nav>
        );
    }
}

export const Navigation = withRouter(NavigationC);