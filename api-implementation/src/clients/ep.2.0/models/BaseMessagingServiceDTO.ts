/* eslint-disable */


export type BaseMessagingServiceDTO = {
    /**
     * ID value of the object
     */
    readonly id?: string;
    /**
     * ID of the Event Portal messaging service
     */
    readonly messagingServiceId?: string;
    /**
     * Name of the Event Portal messaging service
     */
    readonly messagingServiceName?: string;
    /**
     * Values for allowed supported protocols
     */
    supportedProtocols?: Array<string>;
    readonly environmentId?: string;
    readonly environmentName?: string;
    readonly eventMeshId?: string;
    readonly eventMeshName?: string;
    type?: string;
}

export namespace BaseMessagingServiceDTO {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'BaseMessagingServiceDTO';


}