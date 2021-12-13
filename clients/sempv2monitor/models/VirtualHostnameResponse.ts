/* eslint-disable */


import type { SempMeta } from './SempMeta';
import type { VirtualHostname } from './VirtualHostname';
import type { VirtualHostnameCollections } from './VirtualHostnameCollections';
import type { VirtualHostnameLinks } from './VirtualHostnameLinks';

export type VirtualHostnameResponse = {
    collections?: VirtualHostnameCollections;
    data?: VirtualHostname;
    links?: VirtualHostnameLinks;
    meta: SempMeta;
}

export namespace VirtualHostnameResponse {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'VirtualHostnameResponse';


}