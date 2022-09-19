import EPServiceRegistry2 from "./ep.serviceregistry.2";
import { ServiceRegistry } from "./serviceregistry";
import solacecloudfacade from "./solacecloudfacade";

class ServiceRegistryFactory{
    public getRegistry(): ServiceRegistry {
        const epVersion = process.env.EP_VERSION || '1';
        if (epVersion == '1'){
            return solacecloudfacade;
        } else {
            return EPServiceRegistry2;
        }
    }
}