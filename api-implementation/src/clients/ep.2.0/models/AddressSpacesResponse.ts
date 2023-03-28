/* eslint-disable */


import type { AddressSpace } from './AddressSpace';

export type AddressSpacesResponse = {
    data?: Array<AddressSpace>;
    meta?: Record<string, any>;
}

export namespace AddressSpacesResponse {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'AddressSpacesResponse';


}