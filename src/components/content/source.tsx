import React from 'react'
import { usePromiseTracker, Config } from 'react-promise-tracker';
import { CircularProgress } from 'react-md/lib/Progress';
import { SelectField } from 'react-md/lib/SelectFields';
import { commonSelectProps } from './content';
import { useCurrencies } from './hooks';

type SourceSelectorProps = { onSelect(currencyName: string): void }

export const SourceSelector: React.FunctionComponent<SourceSelectorProps> = ({ onSelect }) => {
    const trackerConfig: Config = { area: 'source', delay: 500 };
    const [selected, setSelected] = React.useState<string>();
    const items = useCurrencies('EUR', trackerConfig.area)
    const onSourceChanged = React.useCallback(
        (name) => { setSelected(name); onSelect(name); },
        [onSelect]
    );
    const { promiseInProgress } = usePromiseTracker(trackerConfig);
    if (promiseInProgress) {
        return <CircularProgress id={trackerConfig.area!} />;
    }

    return (
        <SelectField
            {...commonSelectProps}
            id="source-currency"
            label="Source currency"
            placeholder="Source currency"
            name="source-currency"
            menuItems={items}
            value={selected}
            onChange={onSourceChanged}
        />
    )
};