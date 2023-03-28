/* eslint-disable */


export type TopicAddressResourceDTO = {
    readonly createdTime?: string;
    readonly updatedTime?: string;
    readonly createdBy?: string;
    readonly changedBy?: string;
    id?: string;
    applicationDomainId?: string;
    name?: string;
    resource?: string;
    description?: string;
    type?: string;
}

export namespace TopicAddressResourceDTO {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'TopicAddressResourceDTO';


}