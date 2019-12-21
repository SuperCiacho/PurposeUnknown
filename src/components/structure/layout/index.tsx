import React from 'react';
import { NavLink, useLocation, useHistory } from 'react-router-dom';
import { Button } from 'react-md/lib/Buttons';
import { FontIcon } from 'react-md/lib/FontIcons';
import { NavigationDrawer } from 'react-md/lib/NavigationDrawers';
import { navItems } from '../router';
import { styles } from './style';
import { Footer } from './footer';

export const AppLayout: React.FunctionComponent = ({ children }) => {
    const [drawerVisible, setDrawerVisibility] = React.useState(false);
    return (
        <NavigationDrawer
            visible={drawerVisible}
            onVisibilityChange={setDrawerVisibility}
            contentStyle={styles.content}
            toolbarTitle={useTitle()}
            drawerTitle="Purpose unknown"
            drawerChildren={<Footer />}
            mobileDrawerType={NavigationDrawer.DrawerTypes.TEMPORARY_MINI}
            tabletDrawerType={NavigationDrawer.DrawerTypes.PERSISTENT_MINI}
            desktopDrawerType={NavigationDrawer.DrawerTypes.PERSISTENT_MINI}
            navItems={useLinks(drawerVisible)}
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


function useLinks(drawerOpened: boolean): React.ReactElement[] {
    const { push } = useHistory();
    return React.useMemo(
        () => navItems.map(({ to, label, icon }, ix) =>
            <NavLink
                key={ix}
                component={Button}
                to={to}
                activeStyle={styles.link.active}
                style={styles.link.root}
                exact
                onClick={event => { event.preventDefault(); push(to); }}
            >
                <FontIcon style={styles.link.icon} >{icon}</FontIcon>
                {drawerOpened && <div style={styles.link.text}>{label}</div>}
            </NavLink>
        ),
        [push, drawerOpened]
    );
}