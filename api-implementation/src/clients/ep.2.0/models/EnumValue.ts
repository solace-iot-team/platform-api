/* eslint-disable */


export type EnumValue = {
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

export namespace EnumValue {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'EnumValue';


}