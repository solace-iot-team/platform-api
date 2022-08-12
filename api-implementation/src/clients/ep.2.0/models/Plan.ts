/* eslint-disable */


import type { BasePolicyDTO } from './BasePolicyDTO';

export type Plan = {
    /**
     * ID value of the object
     */
    readonly id?: string;
    /**
     * Title of the object
     */
    name?: string;
    policies?: Array<BasePolicyDTO>;
    /**
     * The type of this payload
     */
    readonly type?: string;
}

export namespace Plan {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'Plan';


}