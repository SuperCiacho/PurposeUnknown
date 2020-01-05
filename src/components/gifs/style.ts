export const styles: GifsStyles = {
    list: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        paddingLeft: '2rem',
        paddingRight: '2rem',
    },
    contentWrapper: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        maxWidth: '100%',
        marginTop: 10,
        marginRight: 10,
        border: "1px solid #455A54"
    },
    spinner: { position: 'absolute' },
    error: { position: 'absolute', color: '#90A4AE' },
}

type GifsStyles = {
    list: React.CSSProperties,
    contentWrapper: React.CSSProperties,
    spinner: React.CSSProperties,
    error: React.CSSProperties
}