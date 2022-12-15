/* eslint-disable */


export type EventManagementAgentRegion = {
    /**
     * Primary key set by the server.
     */
    readonly id?: string;
    /**
     * The id of the service from maas-core.
     */
    serviceId: string;
    /**
     * The name of the EventManagementAgentRegion.
     */
    name: string;
    /**
     * The name of the cloud provider.
     */
    cloudProvider: string;
    /**
     * The name of the region.
     */
    region: string;
    /**
     * The host name of the region.
     */
    host: string;
    /**
     * The name of the region's msgVpn.
     */
    msgVpn: string;
    /**
     * The SMF port number.
     */
    port?: number;
    readonly createdBy?: string;
    readonly updatedBy?: string;
    readonly createdTime?: string;
    readonly updatedTime?: string;
}

export namespace EventManagementAgentRegion {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'EventManagementAgentRegion';


}