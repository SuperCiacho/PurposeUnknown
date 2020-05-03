import React from 'react';
import { SelectField } from 'react-md/lib/SelectFields';
import { useCurrencies } from '../../models/currency/hooks';
import { useAsync, TrackerConfig } from '../../utils/hooks';
import { OnSelectCallback } from './typings';

type SourceSelectorProps = { onSelect: OnSelectCallback };

const trackerConfig: TrackerConfig = { area: 'source', delay: 500 };

export const SourceSelector: React.FunctionComponent<SourceSelectorProps> = ({ onSelect }) => {
    const [selected, setSelected] = React.useState<string>();
    const items = useCurrencies('EUR', trackerConfig.area, true);
    const onSourceChanged = React.useCallback(
        (name: string | number, ix: number) => {
            setSelected(name as string);
            onSelect(items[ix]);
        },
        [items, onSelect]
    );

    return (
        useAsync(trackerConfig) || (
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
    );
};
