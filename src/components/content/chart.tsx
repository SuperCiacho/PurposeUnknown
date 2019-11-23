import React from 'react'
import { List, ListItem } from 'react-md/lib/Lists';
import { usePromiseTracker, Config } from 'react-promise-tracker';
import { CircularProgress } from 'react-md/lib/Progress';
import { useExchange } from './hooks';

type ChartProps = { source?: string, target?: string };
export const Chart: React.FunctionComponent<ChartProps> = ({ source, target }) => {
    const trackerArea: Config = { area: 'chart' };
    const data = useExchange(source, target, trackerArea.area);
    const { promiseInProgress } = usePromiseTracker(trackerArea);
    if (promiseInProgress) {
        return <CircularProgress id="chart" />;
    }

    if (!data || data.length === 0) {
        return <>No data available</>
    }

    return (
        <List>
            {data.map(x => <ListItem key={x.date} primaryText={`${x.value2}`} secondaryText={x.date} />)}
        </List>
    )
};