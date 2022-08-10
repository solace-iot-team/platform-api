/* eslint-disable */

export type BasePolicyDTO = ( {
    /**
     * ID value of the object
     */
    readonly id?: string,
    /**
     * The type of this payload
     */
    type?: string,
});

export namespace BasePolicyDTO {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'BasePolicyDTO';


}