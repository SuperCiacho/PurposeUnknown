import React from 'react';
import { useLocation } from 'react-router-dom';
import { NavigationDrawer } from 'react-md/lib/NavigationDrawers';
import { navItems } from '../../../routes';
import { styles } from './style';
import { Footer } from './footer';
import { NavigationLink } from './link';

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
            navItems={useLinks(drawerVisible)}>
            {children}
        </NavigationDrawer>
    );
};

function useTitle(): string {
    const [title, setTitle] = React.useState<string>('Currency exchange');
    const { pathname } = useLocation();
    React.useEffect(() => {
        const name = navItems.find(x => pathname === x.to)?.name;
        if (name) setTitle(name);
    }, [pathname]);
    return title;
}

function useLinks(drawerOpened: boolean): React.ReactElement[] {
    return React.useMemo(
        () => navItems.map(link => <NavigationLink key={link.name} link={link} expanded={drawerOpened} />),
        [drawerOpened]
    );
}
