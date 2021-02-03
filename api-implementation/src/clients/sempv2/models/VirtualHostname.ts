/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export interface VirtualHostname {
    /**
     * Enable or disable Virtual Hostname to Message VPN mapping. The default value is `false`.
     */
    enabled?: boolean;
    /**
     * The message VPN to which this virtual hostname is mapped. The default value is `""`.
     */
    msgVpnName?: string;
    /**
     * The virtual hostname.
     */
    virtualHostname?: string;
}
