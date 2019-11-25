import React from 'react';
import { Card, CardTitle, CardText } from 'react-md/lib/Cards';
import { Grid, Cell } from 'react-md/lib/Grids';
import { Paper } from 'react-md/lib/Papers';
import { Chart } from './chart';
import { SourceSelector } from './source';
import { TargetSelector } from './target';
import { Currency } from '../../models/currency';
import { SelectionContext, ISelectionContext } from '../../utils/context';

export const Content: React.FunctionComponent = () => {
    const [source, selectSource] = React.useState<Currency>();
    const [target, selectTarget] = React.useState<Currency>();
    const selection = React.useMemo<ISelectionContext>(() => ({ source, target, selectTarget, selectSource }), [source, target])
    const targetName = target && target.name;
    const sourceName = source && source.name;
    const value = target && target.value;

    return (
        <SelectionContext.Provider value={selection}>
            <Paper zDepth={2}>
                <Grid spacing={1}>
                    <Cell size={6}>
                        <SourceSelector />
                    </Cell>
                    <Cell size={6} position="right">
                        <TargetSelector />
                    </Cell>
                    <Cell size={12}>
                        <Card>
                            <CardTitle
                                title={`${sourceName || '???'} - ${targetName || '???'}`}
                                subtitle={`Exchange rate: ${value || '---'}`}
                            />
                            <CardText><Chart /></CardText>
                        </Card>
                    </Cell>
                </Grid>
            </Paper>
        </SelectionContext.Provider>
    );
}