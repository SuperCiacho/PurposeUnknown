import * as React from 'react';
import { Currency, CurrencyExchange } from '../../models/currency';
import { Paper } from 'react-md/lib/Papers';
import { SelectField, } from 'react-md/lib/SelectFields';
import { Grid, Cell } from 'react-md/lib/Grids';
import { AppContext } from '../../app.context';
import { ListItemProps } from 'react-md/lib/Lists';
import { Card, CardTitle, CardText } from 'react-md';
import { Chart } from './chart';

interface ContentProps {
    prop?: any;
}

interface ContentState {
    source: Currency[];
    target: Currency[];
    selectedSource?: Currency;
    selectedTarget?: Currency;
    chartSource?: CurrencyExchange[];
}

const commonSelectProps = {
    itemValue: "name",
    position: SelectField.Positions.BELOW,
    fullWidth: true
}

export const Content: React.FunctionComponent<ContentProps> = () => {
    const [state, setState] = React.useState<ContentState>({ source: [], target: [] });
    const { services } = React.useContext(AppContext);
    const onSourceChanged = React.useCallback(
        (name, ix) => {
            setState(s => ({ ...s, selectedSource: s.source[ix] }));
            services.currencies.list(name).then(res => setState(s => ({ ...s, target: res.map(x => ({ ...x, customize })) })))
        },
        [services.currencies, setState])
    const onTargetChanged = React.useCallback(
        (name, ix) => {
            setState(s => ({ ...s, selectedTarget: s.target[ix] }))
            const selectedSourceName = state.selectedSource!.name
            services.currencies.getExchangeHistory(selectedSourceName, name)
                .then(resp => setState(s => ({ ...s, chartSource: resp })))
        },
        [services.currencies, state.selectedSource, setState]
    )
    React.useEffect(
        () => { services.currencies.list().then(res => setState({ source: res, target: [] })) },
        [services.currencies]
    );

    const { source, target, selectedSource, selectedTarget } = state;

    return (
        <Paper zDepth={2}>
            <Grid spacing={1}>
                <Cell size={6}>
                    <SelectField
                        {...commonSelectProps}
                        id="source-currency"
                        label="Source currency"
                        placeholder="Source currency"
                        name="source-currency"
                        menuItems={source}
                        value={selectedSource && selectedSource.name}
                        onChange={onSourceChanged}

                    />
                </Cell>
                <Cell size={6} position="right">
                    <SelectField
                        {...commonSelectProps}
                        id="target-currency"
                        label="Target currency"
                        placeholder="Target currency"
                        menuItems={target}
                        itemProps="customize"
                        value={selectedTarget && selectedTarget.name}
                        onChange={onTargetChanged}
                    />
                </Cell>
                <Cell size={12}>
                    <Card>
                        <CardTitle
                            title={`${(selectedSource && selectedSource.name) || '???'} - ${(selectedTarget && selectedTarget.name) || '???'}`}
                            subtitle={`Exchange rate: ${(selectedTarget && selectedTarget.value) || '---'}`}
                        />
                        <CardText>
                            <Chart data={state.chartSource} />
                        </CardText>
                    </Card>

                </Cell>
            </Grid>
        </Paper>
    );
}

function customize(fieldProps: FieldProps<Currency>): ListItemProps {
    return {
        primaryText: fieldProps.item.name,
        secondaryText: fieldProps.item.value,
        contentStyle: { display: 'flex', justifyContent: 'space-between' },
    }
};

type FieldProps<T> = {
    index: number;
    active: boolean;
    disabled: boolean;
    itemValue: keyof T;
    value: string
    props: ListItemProps
    item: T
    field: React.ReactElement
}