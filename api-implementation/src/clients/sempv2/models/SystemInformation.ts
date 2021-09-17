/* eslint-disable */


export type SystemInformation = {
    /**
     * The platform running the SEMP API.
     */
    platform: string;
    /**
     * The version of the SEMP API.
     */
    sempVersion: string;
}

export namespace SystemInformation {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'SystemInformation';


}