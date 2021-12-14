/* eslint-disable */


import type { SempMeta } from './SempMeta';
import type { VirtualHostname } from './VirtualHostname';
import type { VirtualHostnameCollections } from './VirtualHostnameCollections';
import type { VirtualHostnameLinks } from './VirtualHostnameLinks';

export type VirtualHostnamesResponse = {
    collections?: Array<VirtualHostnameCollections>;
    data?: Array<VirtualHostname>;
    links?: Array<VirtualHostnameLinks>;
    meta: SempMeta;
}

export namespace VirtualHostnamesResponse {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'VirtualHostnamesResponse';


}