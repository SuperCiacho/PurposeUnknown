import React from 'react'
import { Currency } from '../../models/currency';
import { AppContext } from '../../app.context';
import { trackPromise, usePromiseTracker } from 'react-promise-tracker';
import { CircularProgress } from 'react-md/lib/Progress';
import { SelectField } from 'react-md/lib/SelectFields';
import { commonSelectProps } from './content';

type SourceSelectorProps = { onSelect(currencyName: string): void }
type State = { items: Currency[]; selected?: string; };

export const SourceSelector: React.FunctionComponent<SourceSelectorProps> = ({ onSelect }) => {
    const [state, setState] = React.useState<State>({ items: [] });
    const { services } = React.useContext(AppContext);
    React.useEffect(
        () => { trackPromise(services.currencies.list().then(res => setState({ items: res })), 'source') },
        [services.currencies]
    );
    const onSourceChanged = React.useCallback(
        (name) => {
            setState(s => ({ ...s, selected: name }));
            onSelect(name)
        },
        [onSelect]
    );
    const asyncState = usePromiseTracker({ area: 'source ', delay: 5000 });

    if (asyncState.promiseInProgress) {
        return <CircularProgress id="source" />;
    }

    return (
        <SelectField
            {...commonSelectProps}
            id="source-currency"
            label="Source currency"
            placeholder="Source currency"
            name="source-currency"
            menuItems={state.items}
            value={state.selected}
            onChange={onSourceChanged}
        />
    )
};