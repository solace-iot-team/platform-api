/* eslint-disable */


import type { MsgVpnCertMatchingRuleCondition } from './MsgVpnCertMatchingRuleCondition';
import type { MsgVpnCertMatchingRuleConditionLinks } from './MsgVpnCertMatchingRuleConditionLinks';
import type { SempMeta } from './SempMeta';

export type MsgVpnCertMatchingRuleConditionResponse = {
    data?: MsgVpnCertMatchingRuleCondition;
    links?: MsgVpnCertMatchingRuleConditionLinks;
    meta: SempMeta;
}

export namespace MsgVpnCertMatchingRuleConditionResponse {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'MsgVpnCertMatchingRuleConditionResponse';


}