import React from "react";
import { CircularProgress } from 'react-md/lib/Progress';
import { GIFObject } from 'src/models/giphy';
import { styles } from '../style';
import { useAsyncState } from './hooks';

type GifProps = { gif: GIFObject, hdMode?: boolean };
export const Gif: React.FunctionComponent<GifProps> = ({ gif, hdMode }) => {
    const { loading, error, onError, onLoaded } = useAsyncState();
    return (
        <div style={styles.contentWrapper}>
            {loading && <CircularProgress id={gif.id} style={styles.spinner} />}
            {error && <div style={styles.error}>Preview unavailable</div>}
            {hdMode ?
                <video style={styles.content} autoPlay loop src={gif.images.fixed_height.mp4} onLoadedData={onLoaded} /> :
                <img style={styles.content} src={gif.images.fixed_height_downsampled.url} alt={gif.title} onLoad={onLoaded} onError={onError} />
            }
        </div>
    );
};