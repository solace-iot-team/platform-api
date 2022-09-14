/* eslint-disable */


import type { DmrClusterCertMatchingRuleCondition } from './DmrClusterCertMatchingRuleCondition';
import type { DmrClusterCertMatchingRuleConditionLinks } from './DmrClusterCertMatchingRuleConditionLinks';
import type { SempMeta } from './SempMeta';

export type DmrClusterCertMatchingRuleConditionResponse = {
    data?: DmrClusterCertMatchingRuleCondition;
    links?: DmrClusterCertMatchingRuleConditionLinks;
    meta: SempMeta;
}

export namespace DmrClusterCertMatchingRuleConditionResponse {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'DmrClusterCertMatchingRuleConditionResponse';


}