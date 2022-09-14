/* eslint-disable */


export type AboutLinks = {
    /**
     * The URI of this About's API Description object. Available since 2.2.
     */
    apiUri?: string;
    /**
     * The URI of this About object.
     */
    uri?: string;
    /**
     * The URI of this About's User object. Available since 2.2.
     */
    userUri?: string;
}

export namespace AboutLinks {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'AboutLinks';


}