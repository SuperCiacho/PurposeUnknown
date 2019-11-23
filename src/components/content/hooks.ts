import React from "react";
import { trackPromise } from "react-promise-tracker";
import { AppContext } from "../../app.context";
import { Currency, CurrencyExchange } from "../../models/currency";

export function useCurrencies(source?: string, area?: string): Currency[] {
    const { services } = React.useContext(AppContext);
    const [data, setData] = React.useState<Currency[]>([]);
    const service = services.currencies;
    React.useEffect(
        () => {
            if (source) {
                trackPromise(service.list(source).then(setData), area)
            }
        },
        [service, source, area])
    return data;
}

export function useExchange(source?: string, target?: string, area?: string): CurrencyExchange[] {
    const { services } = React.useContext(AppContext);
    const [data, setData] = React.useState<CurrencyExchange[]>([]);
    const service = services.currencies;
    React.useEffect(
        () => {
            if (source && target) {
                trackPromise(service.getExchangeHistory(source, target).then(setData), area)
            }
        },
        [service, source, target, area]
    );
    return data;
}