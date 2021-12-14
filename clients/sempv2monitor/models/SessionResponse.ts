/* eslint-disable */


import type { SempMeta } from './SempMeta';
import type { Session } from './Session';
import type { SessionCollections } from './SessionCollections';
import type { SessionLinks } from './SessionLinks';

export type SessionResponse = {
    collections?: SessionCollections;
    data?: Session;
    links?: SessionLinks;
    meta: SempMeta;
}

export namespace SessionResponse {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'SessionResponse';


}