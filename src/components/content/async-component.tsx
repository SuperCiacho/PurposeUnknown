import React from 'react';
import { Button, CircularProgress } from 'react-md';
import { trackPromise, usePromiseTracker, promiseTrackerHoc } from 'react-promise-tracker';

type AsyncState = { initial?: boolean, loading?: boolean, error?: string };
type EffectDescriptor = { effect: Function, args: [], deps: [] };
type Result = { content?: string, error?: string };
export const Parent: React.FunctionComponent = props => {
    return (
        <React.Fragment>
            <AsyncComponent area="1" />
            <AsyncComponent area="2" />
        </React.Fragment>
    );
}

export const AsyncComponent: React.FunctionComponent<Result & { area: '1' | '2' }> = props => {
    const asyncStuff = useAsync(props.area);
    if (asyncStuff) return asyncStuff;

    return <span style={{ border: "2px solid pink", margin: 5 }}>{props.error || props.content}</span>;
};


function useAsync(area: string): React.ReactElement | null {
    const [{ initial, loading, error }, setter] = React.useState<AsyncState>({ initial: true })
    const { promiseInProgress } = usePromiseTracker({ area });
    if (initial || promiseInProgress) { return <CircularProgress id={area} />; }
    return null;
}

function delay(time: number, stateSetter: Function, fail?: boolean): Promise<Result> {
    return new Promise<Result>((resolve, reject) => {
        const resolver = fail ? reject : resolve;
        const data = fail ? { error: "No data found!" } : { content: 'Content' };
        const action = () => { stateSetter(data); resolver(data) }
        setTimeout(action, time);
    });
}

