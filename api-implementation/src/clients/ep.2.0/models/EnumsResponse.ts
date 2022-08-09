/* eslint-disable */


import type { Enum } from './Enum';

export type EnumsResponse = {
    data?: Array<Enum>;
    meta?: Record<string, any>;
}

export namespace EnumsResponse {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'EnumsResponse';


}