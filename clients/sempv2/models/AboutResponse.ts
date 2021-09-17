/* eslint-disable */


import type { About } from './About';
import type { AboutLinks } from './AboutLinks';
import type { SempMeta } from './SempMeta';

export type AboutResponse = {
    data?: About;
    links?: AboutLinks;
    meta: SempMeta;
}

export namespace AboutResponse {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'AboutResponse';


}