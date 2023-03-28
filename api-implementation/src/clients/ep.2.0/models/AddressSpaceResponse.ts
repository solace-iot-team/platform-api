/* eslint-disable */


import type { AddressSpace } from './AddressSpace';

export type AddressSpaceResponse = {
    data?: AddressSpace;
    meta?: Record<string, any>;
}

export namespace AddressSpaceResponse {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'AddressSpaceResponse';


}