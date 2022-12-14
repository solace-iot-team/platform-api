/* eslint-disable */


export type AddressSpace = {
    readonly createdTime?: string;
    readonly updatedTime?: string;
    readonly createdBy?: string;
    readonly changedBy?: string;
    readonly id?: string;
    brokerType?: string;
    delimiter?: string;
    readonly type?: string;
}

export namespace AddressSpace {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'AddressSpace';


}