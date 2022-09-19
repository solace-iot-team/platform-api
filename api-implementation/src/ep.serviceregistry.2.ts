import { Service } from "./clients/solacecloud/models/Service";
import { ServiceRegistry } from "./serviceregistry";
import solacecloudfacade from "./solacecloudfacade";

export class EPServiceRegistry2 implements ServiceRegistry{
   public async getServiceByEnvironment(e: Components.Schemas.Environment): Promise<Service> {
       return solacecloudfacade.getServiceByEnvironment(e);
    }
    public async getServiceById(id: string): Promise<Service> {
        return solacecloudfacade.getServiceById(id);
    }
    public async getServices(): Promise<Service[]> {
        return solacecloudfacade.getServices();
    }
    
}

export default new EPServiceRegistry2();