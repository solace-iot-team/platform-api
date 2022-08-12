/* eslint-disable */


import type { AddressLevel } from './AddressLevel';

export type TopicDomain = {
    readonly createdTime?: string;
    readonly updatedTime?: string;
    readonly createdBy?: string;
    readonly changedBy?: string;
    applicationDomainId: string;
    brokerType: string;
    addressLevels: Array<AddressLevel>;
    readonly type?: string;
}

export namespace TopicDomain {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'TopicDomain';


}