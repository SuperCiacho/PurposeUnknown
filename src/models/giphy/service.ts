import { GIFObject } from '.';

export class GiphyService {
    private static readonly apiUrl: string = 'https://api.giphy.com/v1/gifs/search?api_key=vMrCkO8lYmns8acOvQFTaWHtnra9HZDi'

    public async search(searchQuery: string, language: string = 'en'): Promise<GiphyApiResponse> {
        const response = await fetch(`${GiphyService.apiUrl}&q=${searchQuery}&limit=25&offset=0&rating=R&lang=${language}`);
        const data: GiphyApiResponse = await response.json();
        return data;
    }
}

interface GiphyApiResponse {
    data: GIFObject[];
    pagination: { total_count: number; count: number; offset: number };
    meta: { status: number; msg: string; response_id: string; };
}