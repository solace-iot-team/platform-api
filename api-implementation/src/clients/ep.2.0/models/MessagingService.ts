/* eslint-disable */


import type { MessagingServiceConnection } from './MessagingServiceConnection';

export type MessagingService = {
    readonly createdTime?: string;
    readonly updatedTime?: string;
    readonly createdBy?: string;
    readonly changedBy?: string;
    /**
     * Primary key set by the server.
     */
    readonly id?: string;
    /**
     * The eventMeshId associated to the messaging service.
     */
    eventMeshId?: string;
    /**
     * The runtimeAgentId associated to the messaging service.
     */
    runtimeAgentId?: string;
    /**
     * The solaceCloudMessagingServiceId associated to the messaging service.
     */
    solaceCloudMessagingServiceId?: string;
    /**
     * The type of the messaging service.
     */
    messagingServiceType?: string;
    /**
     * The name of the messaging service.
     */
    name?: string;
    messagingServiceConnections?: Array<MessagingServiceConnection>;
    eventManagementAgentId?: string;
    readonly type?: string;
}

export namespace MessagingService {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'MessagingService';


}