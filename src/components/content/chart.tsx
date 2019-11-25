import React from 'react'
import { List, ListItem } from 'react-md/lib/Lists';
import { Config } from 'react-promise-tracker';
import { useExchange } from '../../models/currency/hooks';
import { useAsync } from '../../utils/hooks';

type ChartProps = { source?: string, target?: string };
export const Chart: React.FunctionComponent<ChartProps> = ({ source, target }) => {
    const trackerConfig: Config = { area: 'chart' };
    const data = useExchange(source, target, trackerConfig.area);
    const asyncComponent = useAsync(trackerConfig);
    if (asyncComponent) {
        return asyncComponent
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