type NavigationStyles = {
    content: React.CSSProperties,
    link:{
        root: React.CSSProperties,
        active: React.CSSProperties,
    } 
}
export const styles: NavigationStyles = {
    content: { padding: 5 },
    link: {
        root: { display: 'block', marginTop: 10, marginBottom: 10, marginLeft: 5, marginRight: 5 },
        active:  { fontWeight: 600, color: '#FFE600' }
    }
}
