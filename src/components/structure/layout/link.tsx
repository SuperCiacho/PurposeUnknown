import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { Button } from 'react-md/lib/Buttons';
import { FontIcon } from 'react-md/lib/FontIcons';
import { styles } from './style';
import { Link } from 'src/routes';

type NavigationLink = { expanded: boolean, link: Link }
export const NavigationLink: React.FunctionComponent<NavigationLink> = ({ expanded, link }) => {
    const { to, icon, name } = link;
    const { push } = useHistory();
    const navigate = React.useCallback<React.MouseEventHandler<unknown>>(e => { e.preventDefault(); push(to); }, [push, to]);
    return (
        <NavLink
            component={Button}
            to={to}
            activeStyle={styles.link.active}
            style={styles.link.root}
            exact
            onClick={navigate}
        >
            <FontIcon style={styles.link.icon} >{icon}</FontIcon>
            {expanded && <div style={styles.link.text}>{name}</div>}
        </NavLink>
    );
}