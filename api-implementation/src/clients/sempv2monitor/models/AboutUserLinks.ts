/* eslint-disable */


export type AboutUserLinks = {
    /**
     * The URI of this User's collection of User Message VPN objects.
     */
    msgVpnsUri?: string;
    /**
     * The URI of this User object.
     */
    uri?: string;
}

export namespace AboutUserLinks {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'AboutUserLinks';


}