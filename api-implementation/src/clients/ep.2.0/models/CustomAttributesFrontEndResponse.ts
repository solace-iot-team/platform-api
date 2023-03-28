/* eslint-disable */


import type { CustomAttributeFrontEndDTO } from './CustomAttributeFrontEndDTO';

export type CustomAttributesFrontEndResponse = {
    data?: Array<CustomAttributeFrontEndDTO>;
    meta?: Record<string, any>;
}

export namespace CustomAttributesFrontEndResponse {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'CustomAttributesFrontEndResponse';


}