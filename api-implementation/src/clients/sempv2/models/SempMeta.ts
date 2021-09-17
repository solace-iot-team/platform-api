/* eslint-disable */


import type { SempError } from './SempError';
import type { SempPaging } from './SempPaging';
import type { SempRequest } from './SempRequest';

export type SempMeta = {
    /**
     * The total number of objects requested, irrespective of page size. This may be a count of all objects in a collection or a filtered subset. It represents a snapshot in time and may change when paging through results.
     */
    count?: number;
    error?: SempError;
    paging?: SempPaging;
    request: SempRequest;
    /**
     * The HTTP response code, one of 200 (success), 4xx (client error), or 5xx (server error).
     */
    responseCode: number;
}

export namespace SempMeta {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'SempMeta';


}