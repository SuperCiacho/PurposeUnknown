import React from 'react';
import debounce from 'lodash/debounce';
import { Grid, Cell } from 'react-md/lib/Grids';
import { Paper } from 'react-md/lib/Papers';
import { SelectionControl } from 'react-md/lib/SelectionControls';
import { TextField } from 'react-md/lib/TextFields';
import { GifList } from './gif';

export const GifSearch: React.FunctionComponent = () => {
    const [keywords, setKeywords] = React.useState<string | number>('');
    const [limit, setLimit] = React.useState<string | number>();
    const [offset, setOffset] = React.useState<string | number>();
    const [hdMode, setHdMode] = React.useState<boolean>(true);
    const onKeywordsChange = React.useCallback(debounce(setKeywords, 500), [])
    const onHDModeChanged = React.useCallback((value: string | number | boolean) => setHdMode(value as boolean), [])
    return (
        <Paper zDepth={2}>
            <Grid spacing={1}>
                <Cell size={11}>
                    <TextField
                        id="gif-search"
                        label="GIF search"
                        placeholder="Type keywords for search..."
                        onChange={onKeywordsChange}
                    />
                    <GifList keywords={keywords as string} limit={limit as number} offset={offset as number} hdMode={hdMode} />
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
                    <SelectionControl
                        type="checkbox"
                        id="gif-quality"
                        label="HD mode"
                        name="hd-mode"
                        checked={hdMode}
                        onChange={onHDModeChanged}
                    />
                </Cell>
            </Grid>
        </Paper>
    )
};