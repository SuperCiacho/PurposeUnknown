import React from "react";
import { Validator } from "./validator";

const ValidationContext = React.createContext<ValidationContext>(undefined);

export const ValidationProvider: React.FunctionComponent = ({ children }) => {
    const [isValid, setValidity] = React.useState(false);
    const [context, setContext] = React.useState<NonNullable<ValidationContext>>({ validator: new Validator(setValidity), valid: isValid, version: 0 });

    React.useEffect(() => setContext(ctx => ({ ...ctx, valid: isValid, version: ctx.version + 1 })), [isValid]);

    return <ValidationContext.Provider value={context}>{children}</ValidationContext.Provider>;
}

export function useValidationContext<T>(): NonNullable<ValidationContext<T>> {
    const context = React.useContext<ValidationContext>(ValidationContext) as ValidationContext<T>;
    if (!context) {
        throw Error('Context not initialized')
    }

    return context;
}

type ValidationContext<T = unknown> = { validator: Validator<T>, valid: boolean, version: number } | undefined;
