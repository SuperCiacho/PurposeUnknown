import React from 'react';

type GifAsyncState = {
    loading: boolean;
    error: boolean;
    onLoaded: VoidFunction;
    onError: VoidFunction;
};

export function useAsyncState(): GifAsyncState {
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState(false);
    const onLoaded = React.useCallback(() => setLoading(false), []);
    const onError = React.useCallback(() => {
        setLoading(false);
        setError(true);
    }, []);

    return React.useMemo(() => ({ loading, error, onLoaded, onError }), [loading, error, onLoaded, onError]);
}
