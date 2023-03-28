/* eslint-disable */


export type MessagingServiceCredentials = {
    readonly createdTime?: string;
    readonly updatedTime?: string;
    readonly createdBy?: string;
    readonly changedBy?: string;
    /**
     * Primary key set by the server.
     */
    readonly id?: string;
    /**
     * The ID of the authentication object associated to the credentials object.
     */
    readonly messagingServiceAuthenticationId?: string;
    /**
     * The name of the credentials object.
     */
    name: string;
    /**
     * A JSON map containing the credentials information.
     */
    credentials: Record<string, any>;
    readonly type?: string;
}

export namespace MessagingServiceCredentials {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'MessagingServiceCredentials';


}