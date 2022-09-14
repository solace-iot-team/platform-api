/* eslint-disable */


import type { MsgVpnCertMatchingRuleCondition } from './MsgVpnCertMatchingRuleCondition';
import type { MsgVpnCertMatchingRuleConditionLinks } from './MsgVpnCertMatchingRuleConditionLinks';
import type { SempMeta } from './SempMeta';

export type MsgVpnCertMatchingRuleConditionsResponse = {
    data?: Array<MsgVpnCertMatchingRuleCondition>;
    links?: Array<MsgVpnCertMatchingRuleConditionLinks>;
    meta: SempMeta;
}

export namespace MsgVpnCertMatchingRuleConditionsResponse {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'MsgVpnCertMatchingRuleConditionsResponse';


}