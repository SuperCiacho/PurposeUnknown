import React from 'react';
import { Config } from 'react-promise-tracker';
import { GIFObject } from 'src/models/giphy';
import { useGiphySearch } from 'src/models/giphy/hooks';
import { useAsync } from 'src/utils/hooks';
import { CircularProgress } from 'react-md/lib/Progress';

const trackerConfig: Config = { area: 'gif-search', delay: 500 };
type GifListProps = { keywords: string };
export const GifList: React.FunctionComponent<GifListProps> = ({ keywords }) => {
    const gifs = useGiphySearch(keywords).map(x => <Gif key={x.id} {...x} />);
    return useAsync(trackerConfig) || <div style={styles.list}>{gifs}</div>
}

const Gif: React.FunctionComponent<GIFObject> = gif => {
    const [loading, setLoading] = React.useState(true);
    return (
        <div style={styles.contentWrapper}>
            {loading && <CircularProgress id={gif.id} style={styles.spinner} />}
            <video autoPlay loop src={gif.images.fixed_height.mp4} onLoadedData={() => setLoading(false)} />
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
        marginRight: 10
    },
    spinner: { position: 'absolute' }
}

type GifsStyles = {
    list: React.CSSProperties,
    contentWrapper: React.CSSProperties,
    spinner: React.CSSProperties
}