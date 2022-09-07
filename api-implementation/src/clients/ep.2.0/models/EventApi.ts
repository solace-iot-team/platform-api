/* eslint-disable */


export type EventApi = {
    readonly createdTime?: string;
    readonly updatedTime?: string;
    readonly createdBy?: string;
    readonly changedBy?: string;
    /**
     * Primary key set by the server.
     */
    readonly id?: string;
    /**
     * The name of the event api.
     */
    name?: string;
    shared?: boolean;
    applicationDomainId?: string;
    readonly numberOfVersions?: number;
    /**
     * The type of the broker used for the event API
     */
    brokerType: EventApi.brokerType;
    /**
     * The type of this payload, eventApi.
     */
    readonly type?: string;
}

export namespace EventApi {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'EventApi';

    /**
     * The type of the broker used for the event API
     */
    export enum brokerType {
        kafka = 'kafka',
        solace = 'solace',
    }


}