/* eslint-disable */


import type { CustomAttribute } from './CustomAttribute';

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
    customAttributes?: Array<CustomAttribute>;
    readonly type?: string;
}

export namespace Event {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'Event';


}