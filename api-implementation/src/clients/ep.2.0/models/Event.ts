/* eslint-disable */


export type Event = {
    readonly createdTime?: string;
    readonly updatedTime?: string;
    readonly createdBy?: string;
    readonly changedBy?: string;
    readonly id?: string;
    name: string;
    shared?: boolean;
    applicationDomainId: string;
    readonly numberOfVersions?: number;
    readonly type?: string;
}

export namespace Event {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'Event';


}