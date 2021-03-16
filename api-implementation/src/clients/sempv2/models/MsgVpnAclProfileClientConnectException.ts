/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type MsgVpnAclProfileClientConnectException = {
    /**
     * The name of the ACL Profile.
     */
    aclProfileName?: string;
    /**
     * The IP address/netmask of the client connect exception in CIDR form.
     */
    clientConnectExceptionAddress?: string;
    /**
     * The name of the Message VPN.
     */
    msgVpnName?: string;
}
