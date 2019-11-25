import React from 'react'
import { Config } from 'react-promise-tracker';
import { ListItemProps } from 'react-md/lib/Lists';
import { SelectField } from 'react-md/lib/SelectFields';
import { Currency } from '../../models/currency';
import { useCurrencies } from '../../models/currency/hooks';
import { useAsync } from '../../utils/hooks';
import { FieldProps } from './typings';
import { SelectionContext } from '../../utils/context';

export const TargetSelector: React.FunctionComponent = () => {
    const trackerConfig: Config = { area: 'target', delay: 500 };
    const { source, target, selectTarget } = React.useContext(SelectionContext)!;
    const items = useCurrencies(source && source.name, trackerConfig.area).map(x => ({ ...x, customize }));
    const onTargetChanged = React.useCallback((_, ix) => { selectTarget(items![ix]) }, [selectTarget, items]);
    const asyncComponent = useAsync(trackerConfig);
    if (asyncComponent) {
        return asyncComponent
    }

    return (
        <SelectField
            id="target"
            label="Target currency"
            placeholder="Target currency"
            menuItems={items}
            itemValue="name"
            itemProps="customize"
            position={SelectField.Positions.BELOW}
            value={target && target.name}
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

