/* eslint-disable */


import type { Enum } from './Enum';

export type EnumResponse = {
    data?: Enum;
    meta?: Record<string, any>;
}

export namespace EnumResponse {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'EnumResponse';


}