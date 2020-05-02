import React from 'react';
import { Config } from 'react-promise-tracker';
import { ListItemProps } from 'react-md/lib/Lists';
import { SelectField } from 'react-md/lib/SelectFields';
import { Currency } from '../../models/currency';
import { useCurrencies } from '../../models/currency/hooks';
import { useAsync } from '../../utils/hooks';
import { OnSelectCallback, FieldProps } from './typings';

type TargetSelectorProps = { source?: string; onSelect: OnSelectCallback };
const trackerConfig: Config = { area: 'target', delay: 500 };

export const TargetSelector: React.FunctionComponent<TargetSelectorProps> = ({ source, onSelect }) => {
    const [selected, setSelected] = React.useState<string>();
    const items = useCurrencies(source, trackerConfig.area);
    const customizedItems = React.useMemo(() => items.map(x => ({ ...x, customize })), [items]);
    const onTargetChanged = React.useCallback(
        (name: React.ReactText, ix: number) => {
            setSelected(name as string);
            onSelect(items[ix]);
        },
        [onSelect, items]
    );
    return (
        useAsync(trackerConfig) || (
            <SelectField
                id="target"
                label="Target currency"
                placeholder="Target currency"
                menuItems={customizedItems}
                itemValue="name"
                itemProps="customize"
                position={SelectField.Positions.BELOW}
                value={selected}
                disabled={!source}
                onChange={onTargetChanged}
                fullWidth
            />
        )
    );
};

function customize(fieldProps: FieldProps<Currency>): ListItemProps {
    return {
        primaryText: fieldProps.item.name,
        secondaryText: fieldProps.item.value,
        contentStyle: { display: 'flex', justifyContent: 'space-between' }
    };
}
