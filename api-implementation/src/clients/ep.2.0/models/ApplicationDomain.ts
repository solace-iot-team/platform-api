/* eslint-disable */


import type { ApplicationDomainStats } from './ApplicationDomainStats';
import type { CustomAttribute } from './CustomAttribute';

export type ApplicationDomain = {
    readonly createdTime?: string;
    readonly updatedTime?: string;
    readonly createdBy?: string;
    readonly changedBy?: string;
    readonly id?: string;
    name: string;
    description?: string;
    /**
     * Forces all topic addresses within the application domain to be unique.
     */
    uniqueTopicAddressEnforcementEnabled?: boolean;
    /**
     * Forces all topic addresses within the application domain to be prefixed with one of the application domain’s configured topic domains.
     */
    topicDomainEnforcementEnabled?: boolean;
    stats?: ApplicationDomainStats;
    customAttributes?: Array<CustomAttribute>;
    type?: string;
}

export namespace ApplicationDomain {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'ApplicationDomain';


}