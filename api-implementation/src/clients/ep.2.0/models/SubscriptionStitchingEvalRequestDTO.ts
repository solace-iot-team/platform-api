/* eslint-disable */


import type { Subscription } from './Subscription';

export type SubscriptionStitchingEvalRequestDTO = {
    brokerType: string;
    subscriptions?: Array<Subscription>;
}

export namespace SubscriptionStitchingEvalRequestDTO {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'SubscriptionStitchingEvalRequestDTO';


}