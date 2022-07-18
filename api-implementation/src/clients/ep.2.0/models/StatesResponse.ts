/* eslint-disable */


import type { StateDTO } from './StateDTO';

export type StatesResponse = {
    data?: Array<StateDTO>;
    meta?: Record<string, any>;
}

export namespace StatesResponse {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'StatesResponse';


}