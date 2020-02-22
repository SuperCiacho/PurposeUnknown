export class Validator<T, TKey extends keyof T = keyof T> {
    private rules: ValidationStore<T, TKey> = {};
    private onValidate: ValidationCallback;

    constructor(validateCallback: ValidationCallback) {
        this.onValidate = validateCallback;
    }

    public validate(item: T): boolean {
        const result = (Object.keys(this.rules) as TKey[])
            .map(key => ({ key, rules: this.rules[key] }))
            .every(({ key, rules }) => rules!.every(rule => rule(item[key]!)));
        this.onValidate(result);
        return result;
    }

    public register<THelperKey extends TKey>(property: THelperKey, ...validationRules: ValidationRule<T[THelperKey]>[]): void {
        validationRules.forEach(rule => {
            let rules = this.rules[property];
            if (!rules) {
                this.rules[property] = rules = []
            }
            rules.push(rule as ValidationRule<T[TKey]>);
        });
    }
}

type ValidationStore<T, TKey extends keyof T> = { [P in TKey]?: ValidationRule<T[TKey]>[] };
type ValidationRule<T> = (value: NonNullable<T>) => boolean;
type ValidationCallback = (isValid: boolean) => void;

export const Validations = {
    exists: <T>(value: T) => !!value,
    minLength: (min: number) => (value: string | ArrayLike<unknown>) => value.length >= min,
    email: (value: string) => /\S+@\S+\.\S+/.test(value)
}