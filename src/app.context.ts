import React from "react";
import { CurrencyService } from "./models/currency.service";

export interface IAppContext {
    services: {
        currencies: CurrencyService
    }
}

export const defaultAppContext: IAppContext = {
    services: {
        currencies: new CurrencyService()
    }
}

export const AppContext = React.createContext<IAppContext>(defaultAppContext);