import React from 'react';
import { NavLink, useLocation, useHistory } from 'react-router-dom';
import { Button } from 'react-md/lib/Buttons';
import { NavigationDrawer } from 'react-md/lib/NavigationDrawers';
import { navItems } from '../router';
import { styles } from './style';

export const Navigation: React.FunctionComponent = ({ children }) => {
    return (
        <NavigationDrawer
            contentStyle={styles.content}
            toolbarTitle={useTitle()}
            mobileDrawerType={NavigationDrawer.DrawerTypes.TEMPORARY_MINI}
            tabletDrawerType={NavigationDrawer.DrawerTypes.PERSISTENT_MINI}
            desktopDrawerType={NavigationDrawer.DrawerTypes.PERSISTENT_MINI}
            navItems={useLinks()}
        >
            {children}
        </NavigationDrawer>
    );
};

function useTitle(): string {
    const [title, setTitle] = React.useState<string>('Currency exchange');
    const { pathname } = useLocation();
    React.useEffect(
        () => {
            const lastSection = pathname.substring(pathname.lastIndexOf('/') + 1).replace('-', '') || 'Currency exchange';
            setTitle(lastSection.charAt(0).toUpperCase() + lastSection.slice(1))
        },
        [pathname]
    );
    return title;
}


function useLinks(): React.ReactElement[] {
    const { push } = useHistory();
    return React.useMemo(
        () => navItems.map(({ to, label }, ix) =>
            <NavLink
                key={ix}
                component={Button}
                to={to}
                activeStyle={styles.link.active}
                style={styles.link.root}
                exact
                onClick={event => { event.preventDefault(); push(to); }}
            >
                {label}
            </NavLink>
        ),
        [push]
    );
}