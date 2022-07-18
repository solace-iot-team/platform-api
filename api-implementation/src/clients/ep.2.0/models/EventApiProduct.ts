/* eslint-disable */


export type EventApiProduct = {
    readonly createdTime?: string;
    readonly updatedTime?: string;
    readonly createdBy?: string;
    readonly changedBy?: string;
    /**
     * Primary key set by the server.
     */
    readonly id?: string;
    /**
     * The name of the event api product.
     */
    name?: string;
    applicationDomainId?: string;
    shared?: boolean;
    readonly numberOfVersions?: number;
    /**
     * Broker type of the eventApiProduct
     */
    brokerType?: EventApiProduct.brokerType;
    /**
     * The type of this payload, eventApiProduct.
     */
    readonly type?: string;
}

export namespace EventApiProduct {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'EventApiProduct';

    /**
     * Broker type of the eventApiProduct
     */
    export enum brokerType {
        solace = 'solace',
        kafka = 'kafka',
    }


}