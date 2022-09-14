/* eslint-disable */


export type DmrClusterCertMatchingRuleAttributeFilter = {
    /**
     * Link Attribute to be tested. Changes to this attribute are synchronized to HA mates via config-sync. The default value is `""`.
     */
    attributeName?: string;
    /**
     * Expected attribute value. Changes to this attribute are synchronized to HA mates via config-sync. The default value is `""`.
     */
    attributeValue?: string;
    /**
     * The name of the Cluster.
     */
    dmrClusterName?: string;
    /**
     * The name of the filter.
     */
    filterName?: string;
    /**
     * The name of the rule.
     */
    ruleName?: string;
}

export namespace DmrClusterCertMatchingRuleAttributeFilter {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'DmrClusterCertMatchingRuleAttributeFilter';


}