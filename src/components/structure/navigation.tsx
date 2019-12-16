import React from 'react';
import { NavLink, useLocation, match } from 'react-router-dom';
import { Location } from 'history';
import { Button } from 'react-md/lib/Buttons';
import { NavigationDrawer } from 'react-md/lib/NavigationDrawers';
import { navItems } from './router';

export const Navigation: React.FunctionComponent = ({ children }) => {
    return (
        <NavigationDrawer
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

const style: React.CSSProperties = { display: 'block', marginTop: 10, marginBottom: 10, marginLeft: 5, marginRight: 5  };
const activeStyle: React.CSSProperties = {  fontWeight: 600, color: '#FFE600' };

function useLinks(): React.ReactElement[] {
    return React.useMemo(() => navItems.map(({ to, label }, ix) =>
        (
            <NavLink
                key={ix}
                component={Button}
                to={to}
                isActive={isLinkActive}
                activeStyle={activeStyle}
                style={style}
            >
                {label}
            </NavLink>
        )
    ),
        []
    );
}

function isLinkActive(routeMatch: match, location: Location): boolean {
    return (routeMatch && routeMatch.url) === location.pathname
}