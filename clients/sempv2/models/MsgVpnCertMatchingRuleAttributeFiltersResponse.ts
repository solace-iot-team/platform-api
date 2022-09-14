/* eslint-disable */


import type { MsgVpnCertMatchingRuleAttributeFilter } from './MsgVpnCertMatchingRuleAttributeFilter';
import type { MsgVpnCertMatchingRuleAttributeFilterLinks } from './MsgVpnCertMatchingRuleAttributeFilterLinks';
import type { SempMeta } from './SempMeta';

export type MsgVpnCertMatchingRuleAttributeFiltersResponse = {
    data?: Array<MsgVpnCertMatchingRuleAttributeFilter>;
    links?: Array<MsgVpnCertMatchingRuleAttributeFilterLinks>;
    meta: SempMeta;
}

export namespace MsgVpnCertMatchingRuleAttributeFiltersResponse {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'MsgVpnCertMatchingRuleAttributeFiltersResponse';


}