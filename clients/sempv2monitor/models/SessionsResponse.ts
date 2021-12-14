/* eslint-disable */


import type { SempMeta } from './SempMeta';
import type { Session } from './Session';
import type { SessionCollections } from './SessionCollections';
import type { SessionLinks } from './SessionLinks';

export type SessionsResponse = {
    collections?: Array<SessionCollections>;
    data?: Array<Session>;
    links?: Array<SessionLinks>;
    meta: SempMeta;
}

export namespace SessionsResponse {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'SessionsResponse';


}