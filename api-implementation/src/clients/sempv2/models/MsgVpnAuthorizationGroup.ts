/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type MsgVpnAuthorizationGroup = {
    /**
     * The ACL Profile of the LDAP Authorization Group. The default value is `"default"`.
     */
    aclProfileName?: string;
    /**
     * The name of the LDAP Authorization Group. Special care is needed if the group name contains special characters such as '#', '+', ';', '=' as the value of the group name returned from the LDAP server might prepend those characters with '\'. For example a group name called 'test#,lab,com' will be returned from the LDAP server as 'test\#,lab,com'.
     */
    authorizationGroupName?: string;
    /**
     * The Client Profile of the LDAP Authorization Group. The default value is `"default"`.
     */
    clientProfileName?: string;
    /**
     * Enable or disable the LDAP Authorization Group in the Message VPN. The default value is `false`.
     */
    enabled?: boolean;
    /**
     * The name of the Message VPN.
     */
    msgVpnName?: string;
    /**
     * Lower the priority to be less than this group. This attribute is absent from a GET and not updated when absent in a PUT, subject to the exceptions in note 4. The default is not applicable.
     */
    orderAfterAuthorizationGroupName?: string;
    /**
     * Raise the priority to be greater than this group. This attribute is absent from a GET and not updated when absent in a PUT, subject to the exceptions in note 4. The default is not applicable.
     */
    orderBeforeAuthorizationGroupName?: string;
}
