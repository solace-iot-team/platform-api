/* eslint-disable */


import type { DmrClusterCertMatchingRuleAttributeFilter } from './DmrClusterCertMatchingRuleAttributeFilter';
import type { DmrClusterCertMatchingRuleAttributeFilterLinks } from './DmrClusterCertMatchingRuleAttributeFilterLinks';
import type { SempMeta } from './SempMeta';

export type DmrClusterCertMatchingRuleAttributeFilterResponse = {
    data?: DmrClusterCertMatchingRuleAttributeFilter;
    links?: DmrClusterCertMatchingRuleAttributeFilterLinks;
    meta: SempMeta;
}

export namespace DmrClusterCertMatchingRuleAttributeFilterResponse {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'DmrClusterCertMatchingRuleAttributeFilterResponse';


}