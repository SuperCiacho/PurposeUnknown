import * as React from 'react';
import { Toolbar } from 'react-md/lib/Toolbars';

export class Header extends React.Component {
    public render() {
        return (
            <Toolbar
                coloredtouch 
                title="Purpose unknown"
            />
        );
    }
}