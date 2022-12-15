/* eslint-disable */


export type EventManagementAgent = {
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
    /**
     * The ID of the associated EventManagementAgentRegion.
     */
    eventManagementAgentRegionId: string;
    readonly type?: string;
}

export namespace EventManagementAgent {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'EventManagementAgent';


}