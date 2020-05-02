type NavigationStyles = {
    content: React.CSSProperties;
    link: {
        root: React.CSSProperties;
        active: React.CSSProperties;
        icon: React.CSSProperties;
        text: React.CSSProperties;
    };
};
export const styles: NavigationStyles = {
    content: { padding: 5 },
    link: {
        root: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            paddingTop: 10,
            paddingBottom: 10
        },
        active: { fontWeight: 600, color: '#FFAB00' },
        icon: {
            fontSize: 30,
            color: 'inherit',
            marginLeft: 10,
            marginRight: 10
        },
        text: { flexGrow: 2 }
    }
};
