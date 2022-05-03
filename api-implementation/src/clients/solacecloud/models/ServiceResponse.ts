/* eslint-disable */


import type { Service } from './Service';

export type ServiceResponse = {
    data: Service;
    meta?: {
        currentTime?: number,
    };
}

export namespace ServiceResponse {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'ServiceResponse';


}