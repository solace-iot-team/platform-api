import Environment = Components.Schemas.Environment;
import { Service } from './clients/solacecloud/models/Service';

export interface ServiceRegistry {
    getServiceByEnvironment(e: Environment): Promise<Service>;
    getServiceById(id: string): Promise<Service>;
    getServices(): Promise<Service[]>;
}