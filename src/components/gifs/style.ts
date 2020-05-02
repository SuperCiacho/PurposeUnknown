export const styles: GifsStyles = {
    list: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        paddingLeft: 10,
        paddingRight: 10
    },
    contentWrapper: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        maxWidth: '100%',
        marginTop: 10,
        marginRight: 10,
        border: '1px solid #455A54'
    },
    content: { width: '100%' },
    spinner: { position: 'absolute' },
    error: { position: 'absolute', color: '#90A4AE' }
};

type GifsStyles = {
    list: React.CSSProperties;
    contentWrapper: React.CSSProperties;
    content: React.CSSProperties;
    spinner: React.CSSProperties;
    error: React.CSSProperties;
};
