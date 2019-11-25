import React from "react";
import { trackPromise } from "react-promise-tracker";
import { CurrencyService } from "./service";
import { Currency, CurrencyExchange } from ".";

const service: CurrencyService = new CurrencyService();

export function useCurrencies(source?: string, area?: string): Currency[] {
    const [data, setData] = React.useState<Currency[]>([]);
    React.useEffect(
        () => {
            if (source) {
                trackPromise(service.list(source).then(setData), area)
            }
        },
        [source, area])
    return data;
}

export function useExchange(source?: string, target?: string, area?: string): CurrencyExchange[] {
    const [data, setData] = React.useState<CurrencyExchange[]>([]);
    React.useEffect(
        () => {
            if (source && target) {
                trackPromise(service.getExchangeHistory(source, target).then(setData), area)
            }
        },
        [source, target, area]
    );
    return data;
}