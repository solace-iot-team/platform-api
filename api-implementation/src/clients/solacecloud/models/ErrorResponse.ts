/* eslint-disable */


export type ErrorResponse = {
    message?: string;
    errorId?: string;
    meta?: Record<string, any>;
}

export namespace ErrorResponse {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'ErrorResponse';


}