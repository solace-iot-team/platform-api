/* eslint-disable */


export type DmrClusterCertMatchingRule = {
    /**
     * The name of the Cluster.
     */
    dmrClusterName?: string;
    /**
     * Enable or disable a certificate matching rule. Changes to this attribute are synchronized to HA mates via config-sync. The default value is `false`.
     */
    enabled?: boolean;
    /**
     * The name of the rule.
     */
    ruleName?: string;
}

export namespace DmrClusterCertMatchingRule {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'DmrClusterCertMatchingRule';


}