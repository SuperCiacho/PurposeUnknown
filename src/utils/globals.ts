import { IConfiguration } from "../configuration";
import { IAppContext  } from "../app.context";
export { };
declare global {
    let Configuration: IConfiguration;
    type ApplicationContext = IAppContext; 
}

