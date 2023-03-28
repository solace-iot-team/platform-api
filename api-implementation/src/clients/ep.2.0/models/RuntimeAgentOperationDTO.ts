/* eslint-disable */


export type RuntimeAgentOperationDTO = {
    readonly createdTime?: string;
    readonly updatedTime?: string;
    readonly createdBy?: string;
    readonly changedBy?: string;
    id?: string;
    runtimeAgentId?: string;
    messagingServiceId?: string;
    scanType?: string;
    entityTypes?: Array<string>;
    type?: string;
}

export namespace RuntimeAgentOperationDTO {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'RuntimeAgentOperationDTO';


}