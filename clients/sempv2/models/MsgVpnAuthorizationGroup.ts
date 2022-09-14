/* eslint-disable */


export type MsgVpnAuthorizationGroup = {
    /**
     * The ACL Profile of the Authorization Group. Changes to this attribute are synchronized to HA mates and replication sites via config-sync. The default value is `"default"`.
     */
    aclProfileName?: string;
    /**
     * The name of the Authorization Group. For LDAP groups, special care is needed if the group name contains special characters such as '#', '+', ';', '=' as the value of the group name returned from the LDAP server might prepend those characters with '\'. For example a group name called 'test#,lab,com' will be returned from the LDAP server as 'test\#,lab,com'.
     */
    authorizationGroupName?: string;
    /**
     * The Client Profile of the Authorization Group. Changes to this attribute are synchronized to HA mates and replication sites via config-sync. The default value is `"default"`.
     */
    clientProfileName?: string;
    /**
     * Enable or disable the Authorization Group in the Message VPN. Changes to this attribute are synchronized to HA mates and replication sites via config-sync. The default value is `false`.
     */
    enabled?: boolean;
    /**
     * The name of the Message VPN.
     */
    msgVpnName?: string;
    /**
     * Lower the priority to be less than this group. This attribute is absent from a GET and not updated when absent in a PUT, subject to the exceptions in note 4. Changes to this attribute are synchronized to HA mates and replication sites via config-sync. The default is not applicable.
     */
    orderAfterAuthorizationGroupName?: string;
    /**
     * Raise the priority to be greater than this group. This attribute is absent from a GET and not updated when absent in a PUT, subject to the exceptions in note 4. Changes to this attribute are synchronized to HA mates and replication sites via config-sync. The default is not applicable.
     */
    orderBeforeAuthorizationGroupName?: string;
}

export namespace MsgVpnAuthorizationGroup {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'MsgVpnAuthorizationGroup';


}