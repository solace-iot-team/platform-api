/* eslint-disable */


import type { MsgVpnCertMatchingRuleAttributeFilter } from './MsgVpnCertMatchingRuleAttributeFilter';
import type { MsgVpnCertMatchingRuleAttributeFilterLinks } from './MsgVpnCertMatchingRuleAttributeFilterLinks';
import type { SempMeta } from './SempMeta';

export type MsgVpnCertMatchingRuleAttributeFilterResponse = {
    data?: MsgVpnCertMatchingRuleAttributeFilter;
    links?: MsgVpnCertMatchingRuleAttributeFilterLinks;
    meta: SempMeta;
}

export namespace MsgVpnCertMatchingRuleAttributeFilterResponse {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'MsgVpnCertMatchingRuleAttributeFilterResponse';


}