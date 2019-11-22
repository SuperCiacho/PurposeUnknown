import React, { useEffect } from 'react'
import { Currency } from '../../models/currency';
import { AppContext } from '../../app.context';
import { SelectField } from 'react-md/lib/SelectFields';
import { commonSelectProps } from './content';
import { trackPromise, usePromiseTracker } from 'react-promise-tracker';
import { CircularProgress } from 'react-md/lib/Progress';
import { ListItemProps } from 'react-md/lib/Lists';
type State = { items: Currency[], selected?: string };
type TargetSelectorProps = {
    source?: string,
    onSelect(currency: Currency): void
};

export const TargetSelector: React.FunctionComponent<TargetSelectorProps> = ({ source, onSelect }) => {
    const [{ items, selected }, setState] = React.useState<State>({ items: [] });
    const { services } = React.useContext(AppContext);
    const onTargetChanged = React.useCallback(
        (name, ix) => { setState(s => ({ ...s, selected: name })); onSelect(items[ix]) },
        [onSelect, items]
    );

    useEffect(
        () => {
            if (source) {
                trackPromise(
                    services.currencies.list(source).then(res => setState(s => ({ ...s, items: res.map(x => ({ ...x, customize })) }))),
                    'traget'
                )
            }
        },
        [services, source])

    const { promiseInProgress } = usePromiseTracker({ area: 'target ' });
    if (promiseInProgress) {
        return <CircularProgress id="target" />;
    }

    return (
        <SelectField
            {...commonSelectProps}
            id="target-currency"
            label="Target currency"
            placeholder="Target currency"
            menuItems={items}
            itemProps="customize"
            value={selected}
            onChange={onTargetChanged}
        />
    )
};


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