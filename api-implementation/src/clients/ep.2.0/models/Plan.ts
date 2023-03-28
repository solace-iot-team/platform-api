/* eslint-disable */


import type { SolaceClassOfServicePolicy } from './SolaceClassOfServicePolicy';

export type Plan = {
    /**
     * ID value of the object
     */
    readonly id?: string;
    /**
     * Title of the object
     */
    name?: string;
    solaceClassOfServicePolicy?: SolaceClassOfServicePolicy;
    /**
     * The type of this payload
     */
    readonly type: string;
}

export namespace Plan {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'Plan';


}