import { GIFObject } from '.';

export class GiphyService {
    private static readonly apiUrl: string = 'https://api.giphy.com/v1/gifs/search?api_key=vMrCkO8lYmns8acOvQFTaWHtnra9HZDi'

    public async search(searchQuery: string, limit: number = 25, language: string = 'en'): Promise<GiphyApiResponse> {
        limit = limit > 100 ? 100 : limit;
        const response = await fetch(`${GiphyService.apiUrl}&q=${searchQuery}&limit=${limit}&offset=0&rating=R&lang=${language}`);
        const data: GiphyApiResponse = await response.json();
        return data;
    }
}

interface GiphyApiResponse {
    data: GIFObject[];
    pagination: { total_count: number; count: number; offset: number };
    meta: { status: number; msg: string; response_id: string; };
}