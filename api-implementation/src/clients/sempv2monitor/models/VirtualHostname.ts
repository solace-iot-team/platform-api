/* eslint-disable */


export type VirtualHostname = {
    /**
     * Enable or disable Virtual Hostname to Message VPN mapping.
     */
    enabled?: boolean;
    /**
     * The message VPN to which this virtual hostname is mapped.
     */
    msgVpnName?: string;
    /**
     * The virtual hostname.
     */
    virtualHostname?: string;
}

export namespace VirtualHostname {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'VirtualHostname';


}