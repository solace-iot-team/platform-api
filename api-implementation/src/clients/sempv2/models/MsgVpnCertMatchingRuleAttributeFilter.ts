/* eslint-disable */


export type MsgVpnCertMatchingRuleAttributeFilter = {
    /**
     * Client Username Attribute to be tested. Changes to this attribute are synchronized to HA mates and replication sites via config-sync. The default value is `""`.
     */
    attributeName?: string;
    /**
     * Expected attribute value. Changes to this attribute are synchronized to HA mates and replication sites via config-sync. The default value is `""`.
     */
    attributeValue?: string;
    /**
     * The name of the filter.
     */
    filterName?: string;
    /**
     * The name of the Message VPN.
     */
    msgVpnName?: string;
    /**
     * The name of the rule.
     */
    ruleName?: string;
}

export namespace MsgVpnCertMatchingRuleAttributeFilter {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'MsgVpnCertMatchingRuleAttributeFilter';


}