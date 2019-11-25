import React from 'react'
import { usePromiseTracker, Config } from 'react-promise-tracker';
import { CircularProgress } from 'react-md/lib/Progress';
import { SelectField } from 'react-md/lib/SelectFields';
import { useCurrencies } from '../../models/currency/hooks';
import { OnSelectCallback } from './typings';

type SourceSelectorProps = { onSelect: OnSelectCallback }

export const SourceSelector: React.FunctionComponent<SourceSelectorProps> = ({ onSelect }) => {
    const trackerConfig: Config = { area: 'source', delay: 500 };
    const [selected, setSelected] = React.useState<string>();
    const items = useCurrencies('EUR', trackerConfig.area)
    const onSourceChanged = React.useCallback((name, ix) => { setSelected(name); onSelect(items![ix]); }, [items, onSelect]);
    const { promiseInProgress } = usePromiseTracker(trackerConfig);

    if (promiseInProgress) {
        return <CircularProgress id={trackerConfig.area!} />;
    }

    return (
        <SelectField
            id="source-currency"
            label="Source currency"
            placeholder="Source currency"
            name="source-currency"
            value={selected}
            menuItems={items}
            itemValue="name"
            position={SelectField.Positions.BELOW}
            onChange={onSourceChanged}
            fullWidth
        />
    )
};