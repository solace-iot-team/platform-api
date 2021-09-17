/* eslint-disable */


import type { SempMeta } from './SempMeta';
import type { SystemInformation } from './SystemInformation';
import type { SystemInformationLinks } from './SystemInformationLinks';

export type SystemInformationResponse = {
    data?: SystemInformation;
    links?: SystemInformationLinks;
    meta: SempMeta;
}

export namespace SystemInformationResponse {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'SystemInformationResponse';


}