export function initilizeConfiguration(): Promise<void> {
    (global as any).Configuration = new Configuration();
    return Promise.resolve();
}

export interface IConfiguration {
    accessKey: string | undefined;
}

class Configuration implements IConfiguration {
    public get accessKey(): string | undefined {
        let variableKey: string;
        variableKey = "REACT_APP_ACCESS_KEY";
        console.log(process.env);
        return process.env[variableKey];
    }
}
