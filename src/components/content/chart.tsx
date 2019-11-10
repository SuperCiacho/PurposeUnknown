import React from 'react'
import { CurrencyExchange } from '../../models/currency';
import { List, ListItem } from 'react-md/lib/Lists';

type ChartProps = { data?: CurrencyExchange[] };
export const Chart: React.FunctionComponent<ChartProps> = props => {
    if (!props.data) {
        return <>No data available</>
    }

    return (
        <List >
            {props.data.map(x => <ListItem key={x.date} primaryText={`${x.value2}`} secondaryText={x.date} />)}
        </List>
    )
};