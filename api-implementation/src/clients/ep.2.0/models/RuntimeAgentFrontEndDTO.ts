/* eslint-disable */


import type { MessagingService } from './MessagingService';

export type RuntimeAgentFrontEndDTO = {
    readonly createdTime?: string;
    readonly updatedTime?: string;
    readonly createdBy?: string;
    readonly changedBy?: string;
    /**
     * Primary key set by the server.
     */
    readonly id?: string;
    /**
     * The name of the EMA.
     */
    name: string;
    /**
     * The region in which the EMA belongs to, extracted from the EventManagementAgentRegion.
     */
    readonly region?: string;
    /**
     * The SMF username for a customer's EMA to use to communicate to event-portal.
     */
    readonly clientUsername?: string;
    /**
     * The SMF password for a customer's EMA to use to communicate to event-portal.
     */
    readonly clientPassword?: string;
    readonly referencedByMessagingServiceIds?: Array<string>;
    /**
     * Used by admin APIs to get a list of EMAs against the given orgId
     */
    readonly orgId?: string;
    /**
     * The connection status of EP to the actual EMA which this object represents.
     */
    readonly status?: string;
    messagingServicesToUpdate?: Array<string>;
    messagingServicesToCreate?: Array<MessagingService>;
    messagingServicesToDisassociate?: Array<string>;
    readonly type?: string;
    /**
     * The ID of the associated EventManagementAgentRegion.
     */
    eventManagementAgentRegionId: string;
}

export namespace RuntimeAgentFrontEndDTO {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'RuntimeAgentFrontEndDTO';


}