/* eslint-disable */


import type { Service } from './Service';

export type ServicesResponse = {
    data: Array<Service>;
    meta?: {
        currentTime?: number,
        pages?: {
            'next-page'?: number,
            'total-pages'?: number,
        },
        pageNumber?: number,
        count?: number,
        pageSize?: number,
    };
}

export namespace ServicesResponse {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'ServicesResponse';


}