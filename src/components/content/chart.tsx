import React from 'react'
import { CurrencyExchange } from '../../models/currency';
import { List, ListItem } from 'react-md/lib/Lists';
import { AppContext } from '../../app.context';
import { trackPromise, usePromiseTracker } from 'react-promise-tracker';
import { CircularProgress } from 'react-md/lib/Progress';

type ChartState = { data?: CurrencyExchange[] }
type ChartProps = { source?: string, target?: string };
export const Chart: React.FunctionComponent<ChartProps> = ({ source, target }) => {
    const [state, setState] = React.useState<ChartState>({});
    const { services } = React.useContext(AppContext);
    React.useEffect(
        () => {
            if (source && target) {
                trackPromise(services.currencies.getExchangeHistory(source, target).then(data => setState({ data })), 'chart')
            }
        },
        [services, source, target]
    );

    const { promiseInProgress } = usePromiseTracker({ area: 'chart' });
    if (promiseInProgress) {
        return <CircularProgress id="chart" />;
    }

    if (!state.data || state.data.length === 0) {
        return <>No data available</>
    }

    return (
        <List >
            {state.data.map(x => <ListItem key={x.date} primaryText={`${x.value2}`} secondaryText={x.date} />)}
        </List>
    )
};