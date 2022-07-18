/* eslint-disable */


export type eventApiVersion = {
    readonly createdTime?: string;
    readonly updatedTime?: string;
    readonly createdBy?: string;
    readonly changedBy?: string;
    readonly id?: string;
    eventApiId?: string;
    description?: string;
    version?: string;
    displayName?: string;
    producedEventVersionIds?: eventApiVersion.producedEventVersionIds;
    consumedEventVersionIds?: eventApiVersion.consumedEventVersionIds;
    stateId?: string;
    type?: string;
    parent?: {
        createdTime?: string,
        updatedTime?: string,
        createdBy?: string,
        changedBy?: string,
        id?: string,
        name?: string,
        shared?: boolean,
        applicationDomainId?: string,
        numberOfVersions?: number,
        type?: string,
    };
}

export namespace eventApiVersion {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'eventApiVersion';

    export enum producedEventVersionIds {
        _12345678 = '12345678',
        _23456789 = '23456789',
    }

    export enum consumedEventVersionIds {
        _12345678 = '12345678',
        _23456789 = '23456789',
    }


}