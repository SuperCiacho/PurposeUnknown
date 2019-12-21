import React from 'react';

export const Footer: React.FunctionComponent = React.memo(() => (
    <div style={style}>Created by Yorgi</div>
));

const style: React.CSSProperties = {
    position: 'absolute',
    padding: 2,
    bottom: 0,
    fontSize: 10,
    backgroundColor: '#4a4a4a',
    color: '#FFC600',
    textAlign: 'center',
    width: '100%',
}