/* eslint-disable */


export type MsgVpnCertMatchingRule = {
    /**
     * Enable or disable a certificate matching rule. Changes to this attribute are synchronized to HA mates and replication sites via config-sync. The default value is `false`.
     */
    enabled?: boolean;
    /**
     * The name of the Message VPN.
     */
    msgVpnName?: string;
    /**
     * The name of the rule.
     */
    ruleName?: string;
}

export namespace MsgVpnCertMatchingRule {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'MsgVpnCertMatchingRule';


}