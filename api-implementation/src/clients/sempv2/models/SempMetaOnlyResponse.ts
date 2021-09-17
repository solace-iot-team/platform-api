/* eslint-disable */


import type { SempMeta } from './SempMeta';

export type SempMetaOnlyResponse = {
    meta: SempMeta;
}

export namespace SempMetaOnlyResponse {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'SempMetaOnlyResponse';


}