import { getOrg, getOrgObject } from "./cloudtokenhelper";
import EPServiceRegistry2 from "./ep.serviceregistry.2";
import { ServiceRegistry } from "./serviceregistry";
import solacecloudfacade from "./solacecloudfacade";

class ServiceRegistryFactory{
    public getRegistry(): ServiceRegistry {
        const org = getOrgObject();
        const registryType = org.serviceRegistry?org.serviceRegistry:'platform';
        if (registryType == 'eventportal'){
            return EPServiceRegistry2;
        } else {
            return solacecloudfacade;
        }
    }
}

export default new ServiceRegistryFactory();