/* eslint-disable */


import type { MsgVpnCertMatchingRule } from './MsgVpnCertMatchingRule';
import type { MsgVpnCertMatchingRuleLinks } from './MsgVpnCertMatchingRuleLinks';
import type { SempMeta } from './SempMeta';

export type MsgVpnCertMatchingRuleResponse = {
    data?: MsgVpnCertMatchingRule;
    links?: MsgVpnCertMatchingRuleLinks;
    meta: SempMeta;
}

export namespace MsgVpnCertMatchingRuleResponse {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'MsgVpnCertMatchingRuleResponse';


}