/* eslint-disable */


import type { meta } from './meta';

export type EPResponseSetString = {
    data?: Array<string>;
    meta?: meta;
}

export namespace EPResponseSetString {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'EPResponseSetString';


}