import React from 'react';
import debounce from 'lodash/debounce';
import { Paper } from 'react-md/lib/Papers';
import { Grid, Cell } from 'react-md/lib/Grids';
import { TextField } from 'react-md/lib/TextFields';
import { GifList } from './gif';

export const GifSearch: React.FunctionComponent = () => {
    const [keywords, setKeywords] = React.useState<string | number>('');
    const onChange = React.useCallback(debounce(setKeywords, 500), [])
    return (
        <Paper zDepth={2}>
            <Grid spacing={1}>
                <Cell size={12}>
                    <TextField id="gif-search" label="GIF search" placeholder="Type keywords for search..." onChange={onChange} />
                </Cell>
                <GifList keywords={keywords as string} />
            </Grid>
        </Paper>
    )
};