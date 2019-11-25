import React from "react";
import { Currency } from "../models/currency";

type CurrencySelector = (selected: Currency) => void;
export type ISelectionContext = { source?: Currency, target?: Currency, selectSource: CurrencySelector, selectTarget: CurrencySelector }
export const SelectionContext = React.createContext<ISelectionContext | null>(null);