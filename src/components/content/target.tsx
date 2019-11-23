import React from 'react'
import { Currency } from '../../models/currency';
import { SelectField } from 'react-md/lib/SelectFields';
import { commonSelectProps } from './content';
import { usePromiseTracker, Config } from 'react-promise-tracker';
import { CircularProgress } from 'react-md/lib/Progress';
import { ListItemProps } from 'react-md/lib/Lists';
import { useCurrencies } from './hooks';
type TargetSelectorProps = {
    source?: string,
    onSelect(currency: Currency): void
};

export const TargetSelector: React.FunctionComponent<TargetSelectorProps> = ({ source, onSelect }) => {
    const trackerConfig: Config = { area: 'target', delay: 500 };
    const [selected, setSelected] = React.useState<string>();
    let items = useCurrencies(source, trackerConfig.area).map(x => ({ ...x, customize }));
    const onTargetChanged = React.useCallback((name, ix) => { setSelected(name); onSelect(items![ix]) }, [onSelect, items]);

    const { promiseInProgress } = usePromiseTracker(trackerConfig);
    if (promiseInProgress) {
        return <CircularProgress id={trackerConfig.area!} />;
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