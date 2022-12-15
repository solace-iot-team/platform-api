/* eslint-disable */


import type { VersionedObjectStateChangeRequest } from './VersionedObjectStateChangeRequest';

export type StateChangeRequestResponse = {
    data?: VersionedObjectStateChangeRequest;
    meta?: Record<string, any>;
}

export namespace StateChangeRequestResponse {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'StateChangeRequestResponse';


}