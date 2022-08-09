/* eslint-disable */


import type { BaseMessagingServiceDTO } from './BaseMessagingServiceDTO';
import type { Plan } from './Plan';

export type EventApiProductVersion = {
    readonly createdTime?: string;
    readonly updatedTime?: string;
    readonly createdBy?: string;
    readonly changedBy?: string;
    readonly id?: string;
    eventApiProductId?: string;
    description?: string;
    version?: string;
    summary?: string;
    displayName?: string;
    /**
     * List of IDs of associated event API versions
     */
    eventApiVersionIds?: Array<string>;
    stateId?: string;
    plans?: Array<Plan>;
    readonly gatewayMessagingServices?: Array<BaseMessagingServiceDTO>;
    /**
     * The type of payload
     */
    readonly type?: string;
}

export namespace EventApiProductVersion {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'EventApiProductVersion';


}