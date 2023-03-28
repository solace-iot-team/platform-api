/* eslint-disable */


export type BasePolicyDTO = {
    /**
     * ID value of the object
     */
    readonly id?: string;
    type?: string;
}

export namespace BasePolicyDTO {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'BasePolicyDTO';


}