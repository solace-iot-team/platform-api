/* eslint-disable */


import type { AttractedEventVersionTuple } from './AttractedEventVersionTuple';

export type Subscription = {
    readonly id?: string;
    subscriptionType?: string;
    value?: string;
    readonly attractedEventVersionIds?: Array<AttractedEventVersionTuple>;
}

export namespace Subscription {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'Subscription';


}