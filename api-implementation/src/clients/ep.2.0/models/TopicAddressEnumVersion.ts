/* eslint-disable */


import type { CustomAttribute } from './CustomAttribute';
import type { TopicAddressEnumValue } from './TopicAddressEnumValue';

export type TopicAddressEnumVersion = {
    readonly createdTime?: string;
    readonly updatedTime?: string;
    readonly createdBy?: string;
    readonly changedBy?: string;
    readonly id?: string;
    enumId: string;
    description?: string;
    version: string;
    displayName?: string;
    values: Array<TopicAddressEnumValue>;
    readonly referencedByEventVersionIds?: Array<string>;
    readonly referencedByTopicDomainIds?: Array<string>;
    readonly stateId?: string;
    customAttributes?: Array<CustomAttribute>;
    readonly type?: string;
}

export namespace TopicAddressEnumVersion {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'TopicAddressEnumVersion';


}