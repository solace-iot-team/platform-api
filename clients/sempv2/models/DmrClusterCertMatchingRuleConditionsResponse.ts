/* eslint-disable */


import type { DmrClusterCertMatchingRuleCondition } from './DmrClusterCertMatchingRuleCondition';
import type { DmrClusterCertMatchingRuleConditionLinks } from './DmrClusterCertMatchingRuleConditionLinks';
import type { SempMeta } from './SempMeta';

export type DmrClusterCertMatchingRuleConditionsResponse = {
    data?: Array<DmrClusterCertMatchingRuleCondition>;
    links?: Array<DmrClusterCertMatchingRuleConditionLinks>;
    meta: SempMeta;
}

export namespace DmrClusterCertMatchingRuleConditionsResponse {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'DmrClusterCertMatchingRuleConditionsResponse';


}