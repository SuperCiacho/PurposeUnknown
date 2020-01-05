import React from 'react';
import debounce from 'lodash/debounce';
import { Paper } from 'react-md/lib/Papers';
import { Grid, Cell } from 'react-md/lib/Grids';
import { TextField } from 'react-md/lib/TextFields';
import { GifList } from './gif';

export const GifSearch: React.FunctionComponent = () => {
    const [keywords, setKeywords] = React.useState<string | number>('');
    const [limit, setLimit] = React.useState<string | number>();
    const [offset, setOffset] = React.useState<string | number>();
    const onKeywordsChange = React.useCallback(debounce(setKeywords, 500), [])
    return (
        <Paper zDepth={2}>
            <Grid spacing={1}>
                <Cell size={10}>
                    <TextField
                        id="gif-search"
                        label="GIF search"
                        placeholder="Type keywords for search..."
                        onChange={onKeywordsChange}
                    />
                </Cell>
                <Cell size={1} position="right">
                    <TextField
                        id="gif-limit"
                        type="number"
                        min={1}
                        max={100}
                        label="Limit"
                        placeholder="Set optional limit of gifs"
                        helpText="Between 1-100"
                        value={limit}
                        onChange={setLimit}
                    />
                </Cell>
                <Cell size={1} position="right">
                    <TextField
                        id="gif-offset"
                        type="number"
                        min={1}
                        max={100}
                        label="Offset"
                        placeholder="Set optional offset of gifs"
                        helpText="Between 1-100"
                        value={offset}
                        onChange={setOffset}
                    />
                </Cell>
                <GifList keywords={keywords as string} limit={limit as number} offset={offset as number} />
            </Grid>
        </Paper>
    )
};