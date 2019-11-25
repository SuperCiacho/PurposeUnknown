import React from 'react'
import { Config } from 'react-promise-tracker';
import { SelectField } from 'react-md/lib/SelectFields';
import { useCurrencies } from '../../models/currency/hooks';
import { useAsync } from '../../utils/hooks';
import { SelectionContext } from '../../utils/context';

export const SourceSelector: React.FunctionComponent = () => {
    const trackerConfig: Config = { area: 'source', delay: 500 };
    const { source: selectedSource, selectSource } = React.useContext(SelectionContext)!;
    const items = useCurrencies('EUR', trackerConfig.area)
    const onSourceChanged = React.useCallback((_, ix) => { selectSource(items![ix]); }, [items, selectSource]);
    const asyncComponent = useAsync(trackerConfig);
    if (asyncComponent) {
        return asyncComponent
    }

    return (
        <SelectField
            id="source"
            label="Source currency"
            placeholder="Source currency"
            value={selectedSource && selectedSource.name}
            menuItems={items}
            itemValue="name"
            position={SelectField.Positions.BELOW}
            onChange={onSourceChanged}
            fullWidth
        />
    )
};