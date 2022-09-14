/* eslint-disable */


import type { DmrClusterCertMatchingRuleAttributeFilter } from './DmrClusterCertMatchingRuleAttributeFilter';
import type { DmrClusterCertMatchingRuleAttributeFilterLinks } from './DmrClusterCertMatchingRuleAttributeFilterLinks';
import type { SempMeta } from './SempMeta';

export type DmrClusterCertMatchingRuleAttributeFiltersResponse = {
    data?: Array<DmrClusterCertMatchingRuleAttributeFilter>;
    links?: Array<DmrClusterCertMatchingRuleAttributeFilterLinks>;
    meta: SempMeta;
}

export namespace DmrClusterCertMatchingRuleAttributeFiltersResponse {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'DmrClusterCertMatchingRuleAttributeFiltersResponse';


}