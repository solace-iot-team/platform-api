/* eslint-disable */


import type { CloudRequestType } from './CloudRequestType';

export type CloudRequestStatusResponse = {
    data?: {
        id?: string,
        creationTimestamp?: number,
        operation?: CloudRequestType,
        type?: string,
        adminProgress?: string,
    };
}

export namespace CloudRequestStatusResponse {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'CloudRequestStatusResponse';


}