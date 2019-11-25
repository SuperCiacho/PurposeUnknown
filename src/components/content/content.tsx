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

export const Content: React.FunctionComponent<ContentProps> = () => {
    const [selectedSource, selectSource] = React.useState<Currency>();
    const [selectedTarget, selectTarget] = React.useState<Currency>();
    const onSelectSource = React.useCallback<OnSelectCallback>(selectSource, [selectSource])
    const onSelectTarget = React.useCallback<OnSelectCallback>(selectTarget, [selectTarget])

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