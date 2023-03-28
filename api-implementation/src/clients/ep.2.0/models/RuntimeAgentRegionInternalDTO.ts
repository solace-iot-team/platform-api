/* eslint-disable */


export type RuntimeAgentRegionInternalDTO = {
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
    sempPort?: number;
    clientUsername: string;
    clientPassword: string;
    sempUsername: string;
    sempPassword: string;
    clientProfileName?: string;
}

export namespace RuntimeAgentRegionInternalDTO {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'RuntimeAgentRegionInternalDTO';


}