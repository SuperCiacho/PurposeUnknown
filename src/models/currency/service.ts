import { Currency, CurrencyExchange } from '.';

export class CurrencyService {
    private getApiURL(type: RequestType): string {
        return `https://api.exchangeratesapi.io/${type}`;
    }

    public async list(base = 'EUR', withSource?: boolean): Promise<Currency[]> {
        const url = `${this.getApiURL('latest')}?base=${base}`;
        const response: CurrencyResponse = await fetch(url).then(x => x.json());
        const { rates } = response;
        if (withSource && rates[base] === undefined) {
            rates[base] = 1;
        }

        return Object.keys(rates)
            .map(k => new Currency(k, rates[k]))
            .sort((x, y) => x.name.localeCompare(y.name));
    }

    public async getExchangeHistory(base: string, target: string): Promise<CurrencyExchange[]> {
        const now = new Date();
        const start = new Date(now.getFullYear() - 1, now.getMonth(), now.getDate()).toISOString().substring(0, 10);
        const end = now.toISOString().substring(0, 10);
        const url = `${this.getApiURL('history')}?start_at=${start}&end_at=${end}&base=${base}&symbols=${target}`;
        const response: ExchangeResponse = await fetch(url).then(x => x.json());
        const { rates } = response;
        return Object.keys(rates)
            .map(date => new CurrencyExchange(date, rates[date][base], rates[date][target]))
            .sort((x, y) => y.date.localeCompare(x.date));
    }
}

type Rates = Record<string, number>;
type ExchangeRates = Record<string, { [currencyName: string]: number }>;
interface CurrencyResponse {
    base: string;
    date: string;
    rates: Rates;
    success: boolean;
    timestamp: number;
}

interface ExchangeResponse {
    date: string;
    rates: ExchangeRates;
    base: string;
    success: boolean;
    timestamp: number;
}

type RequestType = 'latest' | 'history';
