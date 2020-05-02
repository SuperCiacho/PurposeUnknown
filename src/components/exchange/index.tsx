import React from 'react';
import { Card, CardTitle, CardText } from 'react-md/lib/Cards';
import { Grid, Cell } from 'react-md/lib/Grids';
import { Paper } from 'react-md/lib/Papers';
import { Chart } from './chart';
import { SourceSelector } from './source';
import { TargetSelector } from './target';
import { Currency } from '../../models/currency';

export const Exchange: React.FunctionComponent = () => {
    const [source, selectSource] = React.useState<Currency>();
    const [target, selectTarget] = React.useState<Currency>();

    return (
        <Paper zDepth={2}>
            <Grid spacing={1}>
                <Cell size={6}>
                    <SourceSelector onSelect={selectSource} />
                </Cell>
                <Cell size={6} position="right">
                    <TargetSelector source={source?.name} onSelect={selectTarget} />
                </Cell>
                <Cell size={12}>
                    <Card>
                        <CardTitle
                            title={`${source?.name || '???'} - ${target?.name || '???'}`}
                            subtitle={`Exchange rate: ${target?.value || '---'}`}
                        />
                        <CardText>
                            <Chart source={source?.name} target={target?.name} />
                        </CardText>
                    </Card>
                </Cell>
            </Grid>
        </Paper>
    );
};
