import EPServiceRegistry2 from "./ep.serviceregistry.2";
import { ServiceRegistry } from "./serviceregistry";
import solacecloudfacade from "./solacecloudfacade";

class ServiceRegistryFactory{
    public getRegistry(): ServiceRegistry {
        const epVersion = process.env.SERVICE_REGISTRY || 'platform';
        if (epVersion == 'eventportal'){
            return EPServiceRegistry2;
        } else {
            return solacecloudfacade;
        }
    }
}

export default new ServiceRegistryFactory();