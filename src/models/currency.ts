
export class Currency {
    constructor(name: string, value: number) {
        this.name = name;
        this.value = value;
    }

    public readonly name: string;
    public readonly value: number;
}

export class CurrencyExchange {
    constructor(date: string, value1: number, value2: number) {
        this.date = date;
        this.value1 = value1;
        this.value2 = value2;
    }
    public readonly date:string;
    public readonly value1: number;
    public readonly value2: number;
}
