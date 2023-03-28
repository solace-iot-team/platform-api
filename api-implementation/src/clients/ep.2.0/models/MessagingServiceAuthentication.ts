/* eslint-disable */


import type { MessagingServiceCredentials } from './MessagingServiceCredentials';

export type MessagingServiceAuthentication = {
    readonly createdTime?: string;
    readonly updatedTime?: string;
    readonly createdBy?: string;
    readonly changedBy?: string;
    /**
     * Primary key set by the server.
     */
    readonly id?: string;
    /**
     * The ID of the connection object associated to the authentication object.
     */
    readonly messagingServiceConnectionId?: string;
    /**
     * The name of the authentication object.
     */
    name: string;
    /**
     * The type of the authentication object.
     */
    authenticationType: string;
    /**
     * A JSON map containing a map of extra details for the authentication.
     */
    authenticationDetails?: Record<string, any>;
    messagingServiceCredentials?: Array<MessagingServiceCredentials>;
    readonly type?: string;
}

export namespace MessagingServiceAuthentication {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'MessagingServiceAuthentication';


}