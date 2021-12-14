/* eslint-disable */


export type MsgVpnAuthorizationGroup = {
    /**
     * The ACL Profile of the LDAP Authorization Group.
     */
    aclProfileName?: string;
    /**
     * The name of the LDAP Authorization Group. Special care is needed if the group name contains special characters such as '#', '+', ';', '=' as the value of the group name returned from the LDAP server might prepend those characters with '\'. For example a group name called 'test#,lab,com' will be returned from the LDAP server as 'test\#,lab,com'.
     */
    authorizationGroupName?: string;
    /**
     * The Client Profile of the LDAP Authorization Group.
     */
    clientProfileName?: string;
    /**
     * Indicates whether the LDAP Authorization Group is enabled.
     */
    enabled?: boolean;
    /**
     * The name of the Message VPN.
     */
    msgVpnName?: string;
}

export namespace MsgVpnAuthorizationGroup {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'MsgVpnAuthorizationGroup';


}