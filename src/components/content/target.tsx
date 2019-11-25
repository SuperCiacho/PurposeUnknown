import React from 'react'
import { usePromiseTracker, Config } from 'react-promise-tracker';
import { ListItemProps } from 'react-md/lib/Lists';
import { CircularProgress } from 'react-md/lib/Progress';
import { SelectField } from 'react-md/lib/SelectFields';
import { Currency } from '../../models/currency';
import { useCurrencies } from '../../models/currency/hooks';
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
            id="target-currency"
            label="Target currency"
            placeholder="Target currency"
            menuItems={items}
            itemValue="name"
            itemProps="customize"
            position={SelectField.Positions.BELOW}
            value={selected}
            onChange={onTargetChanged}
            fullWidth
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