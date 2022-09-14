/* eslint-disable */


import type { DmrClusterCertMatchingRule } from './DmrClusterCertMatchingRule';
import type { DmrClusterCertMatchingRuleLinks } from './DmrClusterCertMatchingRuleLinks';
import type { SempMeta } from './SempMeta';

export type DmrClusterCertMatchingRuleResponse = {
    data?: DmrClusterCertMatchingRule;
    links?: DmrClusterCertMatchingRuleLinks;
    meta: SempMeta;
}

export namespace DmrClusterCertMatchingRuleResponse {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'DmrClusterCertMatchingRuleResponse';


}