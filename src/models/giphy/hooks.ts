import React from 'react';
import { trackPromise } from 'react-promise-tracker';
import { GIFObject } from '.';
import { GiphyService } from './service';

const service = new GiphyService();
export function useGiphySearch(keywords: string, area?: string): GIFObject[] {
    const [result, setResult] = React.useState<GIFObject[]>([])
    React.useEffect(
        () => {
            trackPromise(service.search(keywords), area).then(x => setResult(x.data));
        },
        [keywords, area]
    );
    return result;
}