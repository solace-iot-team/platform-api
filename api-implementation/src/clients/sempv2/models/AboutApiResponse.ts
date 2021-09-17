/* eslint-disable */


import type { AboutApi } from './AboutApi';
import type { AboutApiLinks } from './AboutApiLinks';
import type { SempMeta } from './SempMeta';

export type AboutApiResponse = {
    data?: AboutApi;
    links?: AboutApiLinks;
    meta: SempMeta;
}

export namespace AboutApiResponse {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'AboutApiResponse';


}