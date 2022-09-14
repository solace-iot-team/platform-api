/* eslint-disable */


export type MsgVpnClientUsername = {
    /**
     * The ACL Profile of the Client Username. Changes to this attribute are synchronized to HA mates and replication sites via config-sync. The default value is `"default"`.
     */
    aclProfileName?: string;
    /**
     * The Client Profile of the Client Username. Changes to this attribute are synchronized to HA mates and replication sites via config-sync. The default value is `"default"`.
     */
    clientProfileName?: string;
    /**
     * The name of the Client Username.
     */
    clientUsername?: string;
    /**
     * Enable or disable the Client Username. When disabled, all clients currently connected as the Client Username are disconnected. Changes to this attribute are synchronized to HA mates and replication sites via config-sync. The default value is `false`.
     */
    enabled?: boolean;
    /**
     * Enable or disable guaranteed endpoint permission override for the Client Username. When enabled all guaranteed endpoints may be accessed, modified or deleted with the same permission as the owner. Changes to this attribute are synchronized to HA mates and replication sites via config-sync. The default value is `false`.
     */
    guaranteedEndpointPermissionOverrideEnabled?: boolean;
    /**
     * The name of the Message VPN.
     */
    msgVpnName?: string;
    /**
     * The password for the Client Username. This attribute is absent from a GET and not updated when absent in a PUT, subject to the exceptions in note 4. Changes to this attribute are synchronized to HA mates and replication sites via config-sync. The default value is `""`.
     */
    password?: string;
    /**
     * Enable or disable the subscription management capability of the Client Username. This is the ability to manage subscriptions on behalf of other Client Usernames. Changes to this attribute are synchronized to HA mates and replication sites via config-sync. The default value is `false`.
     */
    subscriptionManagerEnabled?: boolean;
}

export namespace MsgVpnClientUsername {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'MsgVpnClientUsername';


}