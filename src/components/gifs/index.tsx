import React from 'react';
import debounce from 'lodash/debounce';
import { Collapse } from 'react-md/lib/Helpers';
import { Grid, Cell } from 'react-md/lib/Grids';
import { Paper } from 'react-md/lib/Papers';
import { SelectionControl } from 'react-md/lib/SelectionControls';
import { TextField } from 'react-md/lib/TextFields';
import { Slider } from 'react-md/lib/Sliders';
import { GifList } from './list';
import { Button } from 'react-md/lib/Buttons';

export const GifSearch: React.FunctionComponent = () => {
    const [keywords, setKeywords] = React.useState<string | number>('');
    const [limit, setLimit] = React.useState<number>(10);
    const [offset, setOffset] = React.useState<number>(0);
    const [hdMode, setHdMode] = React.useState<boolean>(false);
    const [optionsHidden, setOptionsHidden] = React.useState<boolean>(true);
    const onOptionHiddenChange = React.useCallback(() => setOptionsHidden(x => !x), []);
    const onKeywordsChange = React.useCallback(debounce(setKeywords, 500), [])
    const onHDModeChanged = React.useCallback((value: string | number | boolean) => setHdMode(value as boolean), [])
    return (
        <Paper zDepth={2}>
            <Grid spacing={1}>
                <Cell size={12} phoneOrder={1}>
                    <TextField
                        id="gif-search"
                        label="GIF search"
                        placeholder="Type keywords for search..."
                        onChange={onKeywordsChange}
                    />
                </Cell>
                <Cell size={11} phoneOrder={3}>
                    <GifList keywords={keywords as string} limit={limit} offset={offset} hdMode={hdMode} />
                </Cell>
                <Cell size={1} phoneSize={12} phoneOrder={2} >
                    <Button flat iconChildren={`expand_${optionsHidden ? 'more' : 'less'}`} iconBefore={false} onClick={onOptionHiddenChange}>Options</Button>
                    <Collapse collapsed={optionsHidden}>
                        <React.Fragment>
                            <SelectionControl type="checkbox" id="gif-quality" label="HD mode" name="hd-mode" labelBefore checked={hdMode} onChange={onHDModeChanged} />
                            <Slider id="gif-limit" min={1} max={100} label="Limit" value={limit} onChange={setLimit} discrete />
                            <Slider id="gif-offset" min={1} max={100} label="Offset" value={offset} onChange={setOffset} discrete />
                        </React.Fragment>
                    </Collapse>
                </Cell>
            </Grid>
        </Paper>
    )
};