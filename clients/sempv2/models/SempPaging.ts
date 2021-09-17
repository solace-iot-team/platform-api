/* eslint-disable */


export type SempPaging = {
    /**
     * The cursor, or position, for the next page of objects. Use this as the `cursor` query parameter of the next request.
     */
    cursorQuery: string;
    /**
     * The URI of the next page of objects. `cursorQuery` is already embedded within this URI.
     */
    nextPageUri: string;
}

export namespace SempPaging {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'SempPaging';


}