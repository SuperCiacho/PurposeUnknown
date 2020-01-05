import React from 'react';
import { trackPromise } from 'react-promise-tracker';
import { GIFObject } from '.';
import { GiphyService } from './service';

const service = new GiphyService();
export function useGiphySearch(area: string, keywords: string, limit?: number, language?: string): GIFObject[] {
    const [result, setResult] = React.useState<GIFObject[]>([])
    React.useEffect(
        () => {
            if(keywords) {
                trackPromise(service.search(keywords, limit, language), area).then(x => setResult(x.data));
            }
        },
        [area, keywords, limit, language]
    );
    return result;
}