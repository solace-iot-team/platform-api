/* eslint-disable */


import type { Broker } from './Broker';
import type { BrokerCollections } from './BrokerCollections';
import type { BrokerLinks } from './BrokerLinks';
import type { SempMeta } from './SempMeta';

export type BrokerResponse = {
    collections?: BrokerCollections;
    data?: Broker;
    links?: BrokerLinks;
    meta: SempMeta;
}

export namespace BrokerResponse {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'BrokerResponse';


}