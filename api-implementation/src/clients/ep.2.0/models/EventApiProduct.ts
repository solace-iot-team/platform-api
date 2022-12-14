/* eslint-disable */


import type { CustomAttribute } from './CustomAttribute';

export type EventApiProduct = {
    readonly createdTime?: string;
    readonly updatedTime?: string;
    readonly createdBy?: string;
    readonly changedBy?: string;
    /**
     * Primary key set by the server
     */
    readonly id?: string;
    /**
     * The name of the event API product
     */
    name?: string;
    applicationDomainId?: string;
    shared?: boolean;
    readonly numberOfVersions?: number;
    /**
     * The type of the broker used for the event API product
     */
    brokerType: EventApiProduct.brokerType;
    customAttributes?: Array<CustomAttribute>;
    /**
     * The type of payload
     */
    readonly type?: string;
}

export namespace EventApiProduct {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'EventApiProduct';

    /**
     * The type of the broker used for the event API product
     */
    export enum brokerType {
        kafka = 'kafka',
        solace = 'solace',
    }


}