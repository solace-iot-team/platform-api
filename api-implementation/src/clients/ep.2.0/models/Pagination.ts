/* eslint-disable */


export type Pagination = {
    pageNumber?: number;
    count?: number;
    pageSize?: number;
    nextPage?: number;
    totalPages?: number;
}

export namespace Pagination {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'Pagination';


}