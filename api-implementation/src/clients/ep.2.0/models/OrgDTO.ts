/* eslint-disable */


import type { OrgStats } from './OrgStats';

export type OrgDTO = {
    id?: string;
    eventPortalAccessEnabled?: boolean;
    topicAddressResourcesAccessEnabled?: boolean;
    createdTime?: number;
    updatedTime?: number;
    objectLimit?: number;
    objectVersionLimit?: number;
    applicationDomainLimit?: number;
    eventMeshLimit?: number;
    eventApiLimit?: number;
    eventApiProductLimit?: number;
    consumerLimit?: number;
    topicDomainLimitPerApplicationDomain?: number;
    enumLimit?: number;
    enumValueLimit?: number;
    messagingServiceLimit?: number;
    configurationLimit?: number;
    subscriptionLimit?: number;
    subscriptionPerApplicationVersionLimit?: number;
    graphNodeLimit?: number;
    productTier?: OrgDTO.productTier;
    organizationType?: OrgDTO.organizationType;
    stats?: OrgStats;
    type?: string;
}

export namespace OrgDTO {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'OrgDTO';

    export enum productTier {
        None = 'None',
        Standard = 'Standard',
        Small = 'Small',
        Medium = 'Medium',
        Large = 'Large',
        ExtraLarge = 'Extra Large',
        Custom = 'Custom',
    }

    export enum organizationType {
        enterprise = 'enterprise',
    }


}