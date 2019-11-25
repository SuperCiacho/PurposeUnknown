import React from 'react'
import { Config, usePromiseTracker } from "react-promise-tracker";
import { CircularProgress } from "react-md/lib/Progress";

export function useAsync(trackerConfig: Config): React.ReactElement | null {
    const { promiseInProgress } = usePromiseTracker(trackerConfig);
    
    if (promiseInProgress) {
        return <CircularProgress id={trackerConfig.area!} />;
    }

    return null;
}