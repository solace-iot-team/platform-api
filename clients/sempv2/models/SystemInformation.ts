/* eslint-disable */


export type SystemInformation = {
    /**
     * The platform running the SEMP API. Deprecated since 2.2. /systemInformation was replaced by /about/api.
     */
    platform?: string;
    /**
     * The version of the SEMP API. Deprecated since 2.2. /systemInformation was replaced by /about/api.
     */
    sempVersion?: string;
}

export namespace SystemInformation {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'SystemInformation';


}