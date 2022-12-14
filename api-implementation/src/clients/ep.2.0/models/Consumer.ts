/* eslint-disable */


import type { Subscription } from './Subscription';

export type Consumer = {
    readonly createdTime?: string;
    readonly updatedTime?: string;
    readonly createdBy?: string;
    readonly changedBy?: string;
    readonly id?: string;
    name?: string;
    applicationVersionId: string;
    brokerType?: string;
    consumerType?: string;
    subscriptions?: Array<Subscription>;
    type?: string;
}

export namespace Consumer {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'Consumer';


}