/* eslint-disable */


import type { DmrClusterCertMatchingRule } from './DmrClusterCertMatchingRule';
import type { DmrClusterCertMatchingRuleLinks } from './DmrClusterCertMatchingRuleLinks';
import type { SempMeta } from './SempMeta';

export type DmrClusterCertMatchingRulesResponse = {
    data?: Array<DmrClusterCertMatchingRule>;
    links?: Array<DmrClusterCertMatchingRuleLinks>;
    meta: SempMeta;
}

export namespace DmrClusterCertMatchingRulesResponse {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'DmrClusterCertMatchingRulesResponse';


}