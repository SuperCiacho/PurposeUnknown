import React from 'react';
import { Config } from 'react-promise-tracker';
import { useGiphySearch } from 'src/models/giphy/hooks';
import { useAsync } from 'src/utils/hooks';
import { Gif } from './gif';
import { styles } from './style';

const trackerConfig: Required<Config> = { area: 'gif-search', delay: 500 };

type GifListProps = {
    keywords: string;
    limit?: number;
    offset?: number;
    hdMode?: boolean;
};

export const GifList: React.FunctionComponent<GifListProps> = ({ keywords, limit, offset, hdMode }) => {
    const gifs = useGiphySearch(trackerConfig.area, keywords, limit, offset).map(x => (
        <Gif key={x.id} gif={x} hdMode={hdMode} />
    ));
    return useAsync(trackerConfig) || <div style={styles.list}>{gifs}</div>;
};
