import React from 'react'
import { Config } from 'react-promise-tracker';
import { SelectField } from 'react-md/lib/SelectFields';
import { useCurrencies } from '../../models/currency/hooks';
import { useAsync } from '../../utils/hooks';
import { OnSelectCallback } from './typings';

type SourceSelectorProps = { onSelect: OnSelectCallback }

export const SourceSelector: React.FunctionComponent<SourceSelectorProps> = ({ onSelect }) => {
    const trackerConfig: Config = { area: 'source', delay: 500 };
    const [selected, setSelected] = React.useState<string>();
    const items = useCurrencies('EUR', trackerConfig.area)
    const onSourceChanged = React.useCallback((name, ix) => { setSelected(name); onSelect(items![ix]); }, [items, onSelect]);
    const asyncComponent = useAsync(trackerConfig);
    if (asyncComponent) {
        return asyncComponent
    }

    return (
        <SelectField
            id="source"
            label="Source currency"
            placeholder="Source currency"
            value={selected}
            menuItems={items}
            itemValue="name"
            position={SelectField.Positions.BELOW}
            onChange={onSourceChanged}
            fullWidth
        />
    )
};