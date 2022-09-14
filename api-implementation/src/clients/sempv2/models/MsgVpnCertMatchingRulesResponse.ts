/* eslint-disable */


import type { MsgVpnCertMatchingRule } from './MsgVpnCertMatchingRule';
import type { MsgVpnCertMatchingRuleLinks } from './MsgVpnCertMatchingRuleLinks';
import type { SempMeta } from './SempMeta';

export type MsgVpnCertMatchingRulesResponse = {
    data?: Array<MsgVpnCertMatchingRule>;
    links?: Array<MsgVpnCertMatchingRuleLinks>;
    meta: SempMeta;
}

export namespace MsgVpnCertMatchingRulesResponse {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'MsgVpnCertMatchingRulesResponse';


}