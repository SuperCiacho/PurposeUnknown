import React from 'react';
import { List, ListItem } from 'react-md/lib/Lists';
import { useExchange } from 'src/models/currency/hooks';
import { useAsync, TrackerConfig } from 'src/utils/hooks';

type ChartProps = { source?: string; target?: string };
export const Chart: React.FunctionComponent<ChartProps> = ({ source, target }) => {
    const trackerConfig: TrackerConfig = { area: 'chart' };
    const data = useExchange(source, target, trackerConfig.area);
    return (
        useAsync(trackerConfig) ||
        ((!data || data.length === 0) && <p>No data available</p>) || (
            <List>
                {data.map(x => (
                    <ListItem key={x.date} primaryText={`${x.value2}`} secondaryText={x.date} />
                ))}
            </List>
        )
    );
};
