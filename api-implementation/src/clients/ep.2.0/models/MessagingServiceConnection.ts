/* eslint-disable */


import type { MessagingServiceAuthentication } from './MessagingServiceAuthentication';

export type MessagingServiceConnection = {
    readonly createdTime?: string;
    readonly updatedTime?: string;
    readonly createdBy?: string;
    readonly changedBy?: string;
    /**
     * Primary key set by the server.
     */
    readonly id?: string;
    /**
     * The messagingServiceId associated to the connection object.
     */
    readonly messagingServiceId?: string;
    /**
     * The name of the connection object.
     */
    name?: string;
    /**
     * The url of the connection object.
     */
    url?: string;
    /**
     * The protocol of the connection object.
     */
    protocol?: string;
    /**
     * The protocolVersion of the connection object.
     */
    protocolVersion?: string;
    /**
     * A JSON map containing a map of connection-specific values.
     */
    bindings?: Record<string, any>;
    messagingServiceAuthentications?: Array<MessagingServiceAuthentication>;
    readonly type?: string;
}

export namespace MessagingServiceConnection {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'MessagingServiceConnection';


}