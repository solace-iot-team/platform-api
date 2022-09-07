/* eslint-disable */


export type TopicAddressEnumValue = {
    readonly createdTime?: string;
    readonly updatedTime?: string;
    readonly createdBy?: string;
    readonly changedBy?: string;
    readonly id?: string;
    enumVersionId?: string;
    value: string;
    label?: string;
    readonly type?: string;
}

export namespace TopicAddressEnumValue {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'TopicAddressEnumValue';


}