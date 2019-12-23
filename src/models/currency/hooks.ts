import React from "react";
import { trackPromise } from "react-promise-tracker";
import { CurrencyService } from "./service";
import { Currency, CurrencyExchange } from ".";

const service: CurrencyService = new CurrencyService();
const emptyArray: any[] = [];
type SimpleCache<T> = { [key: string]: T };

export function useCurrencies(source?: string, area?: string, withSource?: boolean): Currency[] {
    const [data, setData] = React.useState<SimpleCache<Currency[]>>({});
    const result = data[source || ''];
    React.useEffect(
        () => {
            if (!result && source) {
                trackPromise(service.list(source, withSource)
                    .then(currencies =>
                        setData(store => {
                            store[source] = currencies;
                            return store
                        })
                    ),
                    area
                );
            }
        },
        [source, area, result, withSource])
    return result || emptyArray;
}

export function useExchange(source?: string, target?: string, area?: string): CurrencyExchange[] {
    const [data, setData] = React.useState<SimpleCache<CurrencyExchange[]>>({});
    const result = data['' + source + target];
    React.useEffect(
        () => {
            if (!result && source && target) {
                trackPromise(service.getExchangeHistory(source, target)
                    .then(exchanges =>
                        setData(store => {
                            store[source + target] = exchanges;
                            return store;
                        })),
                    area
                )
            };
        },
        [source, target, area, result]
    );
    return result || emptyArray;
}