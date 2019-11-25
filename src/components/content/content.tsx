import React from 'react';
import { Card, CardTitle, CardText } from 'react-md/lib/Cards';
import { Grid, Cell } from 'react-md/lib/Grids';
import { Paper } from 'react-md/lib/Papers';
import { Chart } from './chart';
import { SourceSelector } from './source';
import { TargetSelector } from './target';
import { Currency } from '../../models/currency';
import { OnSelectCallback } from './typings';

interface ContentProps { }

interface ContentState {
    selectedSource?: Currency;
    selectedTarget?: Currency;
}

export const Content: React.FunctionComponent<ContentProps> = () => {
    const [state, setState] = React.useState<ContentState>({});
    const onSelectSource = React.useCallback<OnSelectCallback>(selected => setState(s => ({ ...s, selectedSource: selected })), [setState])
    const onSelectTarget = React.useCallback<OnSelectCallback>(selected => setState(s => ({ ...s, selectedTarget: selected })), [setState])

    const { selectedSource, selectedTarget } = state;
    const targetName = selectedTarget && selectedTarget.name;
    const sourceName = selectedSource && selectedSource.name;
    const value = selectedTarget && selectedTarget.value;

    return (
        <Paper zDepth={2}>
            <Grid spacing={1}>
                <Cell size={6}>
                    <SourceSelector onSelect={onSelectSource} />
                </Cell>
                <Cell size={6} position="right">
                    <TargetSelector source={sourceName} onSelect={onSelectTarget} />
                </Cell>
                <Cell size={12}>
                    <Card>
                        <CardTitle
                            title={`${sourceName || '???'} - ${targetName || '???'}`}
                            subtitle={`Exchange rate: ${value || '---'}`}
                        />
                        <CardText>
                            <Chart source={sourceName} target={targetName} />
                        </CardText>
                    </Card>
                </Cell>
            </Grid>
        </Paper>
    );
}