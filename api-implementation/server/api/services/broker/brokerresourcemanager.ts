import App = Components.Schemas.App;
import APIProduct = Components.Schemas.APIProduct;
import Attributes = Components.Schemas.Attributes;

import { Service } from '../../../../src/clients/solacecloud/models/Service';

export interface BrokerResourceManager<T> {
    create(app: App, services: Service[],
    apiProducts: APIProduct[], ownerAttributes?: Attributes): Promise<T>

    delete(app: App, services: Service[]): Promise<void>
}