/* eslint-disable */


export type EventApiVersion = {
    readonly createdTime?: string;
    readonly updatedTime?: string;
    readonly createdBy?: string;
    readonly changedBy?: string;
    readonly id?: string;
    eventApiId?: string;
    description?: string;
    version?: string;
    displayName?: string;
    producedEventVersionIds?: Array<string>;
    consumedEventVersionIds?: Array<string>;
    declaredEventApiProductVersionIds?: Array<string>;
    stateId?: string;
    type?: string;
}

export namespace EventApiVersion {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'EventApiVersion';


}