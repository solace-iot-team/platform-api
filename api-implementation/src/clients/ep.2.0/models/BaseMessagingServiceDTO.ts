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
     * Values for allowed supported protocols
     */
    supportedProtocols?: Array<string>;
    readonly environmentId?: string;
    readonly environmentName?: string;
    readonly eventMeshId?: string;
    readonly eventMeshName?: string;
    /**
     * The type of payload
     */
    type?: string;
}

export namespace BaseMessagingServiceDTO {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'BaseMessagingServiceDTO';


}