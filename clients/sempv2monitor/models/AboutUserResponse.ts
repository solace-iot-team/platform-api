/* eslint-disable */


import type { AboutUser } from './AboutUser';
import type { AboutUserCollections } from './AboutUserCollections';
import type { AboutUserLinks } from './AboutUserLinks';
import type { SempMeta } from './SempMeta';

export type AboutUserResponse = {
    collections?: AboutUserCollections;
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