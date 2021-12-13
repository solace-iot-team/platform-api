/* eslint-disable */


export type SempRequest = {
    /**
     * The HTTP method of the request which resulted in this response.
     */
    method: string;
    /**
     * The URI of the request which resulted in this response.
     */
    uri: string;
}

export namespace SempRequest {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'SempRequest';


}