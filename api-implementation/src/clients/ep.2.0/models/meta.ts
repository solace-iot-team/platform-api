/* eslint-disable */


import type { Pagination } from './Pagination';

export type meta = {
    pagination?: Pagination;
}

export namespace meta {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'meta';


}