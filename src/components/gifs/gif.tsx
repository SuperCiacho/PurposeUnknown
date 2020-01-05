import React from 'react';
import { Config } from 'react-promise-tracker';
import { CircularProgress } from 'react-md/lib/Progress';
import { GIFObject } from 'src/models/giphy';
import { useGiphySearch } from 'src/models/giphy/hooks';
import { useAsync } from 'src/utils/hooks';

const trackerConfig: Config = { area: 'gif-search', delay: 500 };
type GifListProps = { keywords: string, limit?: number, offset?: number, hdMode?: boolean };
export const GifList: React.FunctionComponent<GifListProps> = ({ keywords, limit, offset, hdMode }) => {
    const gifs = useGiphySearch(trackerConfig.area!, keywords, limit, offset).map(x => <Gif key={x.id} gif={x} hdMode={hdMode} />);
    return useAsync(trackerConfig) || <div style={styles.list}>{gifs}</div>
}

type GifProps = { gif: GIFObject, hdMode?: boolean };
const Gif: React.FunctionComponent<GifProps> = ({ gif, hdMode }) => {
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState(false);
    const onLoaded = React.useCallback(() => setLoading(false), [])
    const onError = React.useCallback(() => {
        setLoading(false);
        setError(true)
    }, [])
    return (
        <div style={styles.contentWrapper}>
            {loading && <CircularProgress id={gif.id} style={styles.spinner} />}
            {error && <div style={styles.error}>Preview unavailable</div>}
            {hdMode ?
                <video autoPlay loop src={gif.images.fixed_height.mp4} onLoadedData={onLoaded} /> :
                <img src={gif.images.fixed_height_downsampled.url} alt={gif.title} onLoad={onLoaded} onError={onError} />
            }
        </div>
    );
};

const styles: GifsStyles = {
    list: { display: 'flex', flexWrap: 'wrap', justifyContent: 'center', padding: 50 },
    contentWrapper: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
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