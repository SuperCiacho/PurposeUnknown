import { Currency } from './currency';

interface Rates { [key: string]: number; }
interface CurrencyResponse {
    base: string;
    date: string;
    rates: Rates;
    success: boolean;
    timestamp: number;
}

export class CurrencyService {
    // email: j4189033@nwytg.net
    private readonly currenciesApi = `http://data.fixer.io/api/latest?access_key=${Configuration.accessKey}`;

    public async list(): Promise<Currency[]> {
        const response: CurrencyResponse = await fetch(this.currenciesApi).then(x => x.json());
        const rates = response.rates;
        const currencies = Object.keys(rates).map(k => ({ name: k, value: rates[k] }));
        return currencies;
    }
}



