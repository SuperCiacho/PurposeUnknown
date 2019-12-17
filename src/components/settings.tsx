import React from 'react';
import { Paper } from 'react-md/lib/Papers';
import { Grid, Cell } from 'react-md/lib/Grids';

export const Settings: React.FunctionComponent = () => (
    <Paper zDepth={2}>
        <Grid spacing={1}>
            <Cell>
                <p>There's nothing yet</p>
            </Cell>
        </Grid>
    </Paper>
)