/* eslint-disable */


export type AboutApi = {
    /**
     * The platform running the SEMP API.
     */
    platform?: string;
    /**
     * The version of the SEMP API.
     */
    sempVersion?: string;
}

export namespace AboutApi {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'AboutApi';


}