import React from 'react';
import { Card, CardTitle, CardText } from 'react-md/lib/Cards';
import { Grid, Cell } from 'react-md/lib/Grids';
import { Paper } from 'react-md/lib/Papers';
import { Chart } from './chart';
import { SourceSelector } from './source';
import { TargetSelector } from './target';
import { Currency } from '../../models/currency';

interface ContentProps {
    prop?: any;
}

interface ContentState {
    selectedSource?: string;
    selectedTarget?: Currency;
}

export const Content: React.FunctionComponent<ContentProps> = () => {
    const [state, setState] = React.useState<ContentState>({});
    const onSelectSource = React.useCallback((selected: string) => setState(s => ({ ...s, selectedSource: selected })), [setState])
    const onSelectTarget = React.useCallback((selected: Currency) => setState(s => ({ ...s, selectedTarget: selected })), [setState])
    
    const { selectedSource, selectedTarget } = state;
    const targetName = selectedTarget && selectedTarget.name;
    const value = selectedTarget && selectedTarget.value;

    return (
        <Paper zDepth={2}>
            <Grid spacing={1}>
                <Cell size={6}>
                    <SourceSelector onSelect={onSelectSource} />
                </Cell>
                <Cell size={6} position="right">
                    <TargetSelector source={selectedSource} onSelect={onSelectTarget} />
                </Cell>
                <Cell size={12}>
                    <Card>
                        <CardTitle
                            title={`${selectedSource || '???'} - ${targetName || '???'}`}
                            subtitle={`Exchange rate: ${value || '---'}`}
                        />
                        <CardText>
                            <Chart source={state.selectedSource} target={targetName} />
                        </CardText>
                    </Card>

                </Cell>
            </Grid>
        </Paper>
    );
}