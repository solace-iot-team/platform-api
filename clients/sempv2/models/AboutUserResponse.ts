/* eslint-disable */


import type { AboutUser } from './AboutUser';
import type { AboutUserLinks } from './AboutUserLinks';
import type { SempMeta } from './SempMeta';

export type AboutUserResponse = {
    data?: AboutUser;
    links?: AboutUserLinks;
    meta: SempMeta;
}

export namespace AboutUserResponse {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'AboutUserResponse';


}