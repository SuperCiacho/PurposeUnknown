import React from 'react';

const Exchange = React.lazy(() => import('./components/exchange').then(x => ({ default: x.Exchange })));
const Directory = React.lazy(() => import('./components/user').then(x => ({ default: x.User })));
const GifSearch = React.lazy(() => import('./components/gifs').then(x => ({ default: x.GifSearch })));
const Settings = React.lazy(() => import('./components/settings').then(x => ({ default: x.Settings })));

export const navItems: Link[] = [
    {
        name: 'Currency exchange',
        component: Exchange,
        to: '/',
        icon: 'monetization_on',
        exact: true
    },
    { name: 'User', component: Directory, to: '/user', icon: 'face' },
    { name: 'GIF search', component: GifSearch, to: '/gifs', icon: 'gif' },
    { name: 'Settings', component: Settings, to: '/settings', icon: 'build' }
];

export type Link = {
    name: string;
    component: React.ComponentClass | React.FunctionComponent;
    to: string;
    icon: string;
    exact?: boolean;
};
