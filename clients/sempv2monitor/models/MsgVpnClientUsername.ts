/* eslint-disable */


export type MsgVpnClientUsername = {
    /**
     * The ACL Profile of the Client Username.
     */
    aclProfileName?: string;
    /**
     * The Client Profile of the Client Username.
     */
    clientProfileName?: string;
    /**
     * The name of the Client Username.
     */
    clientUsername?: string;
    /**
     * Indicates whether the Client Username was dynamically created based on remote authorization data.
     */
    dynamic?: boolean;
    /**
     * Indicates whether the Client Username is enabled.
     */
    enabled?: boolean;
    /**
     * Indicates whether the guaranteed endpoint permission override is enabled for the Client Username.
     */
    guaranteedEndpointPermissionOverrideEnabled?: boolean;
    /**
     * The name of the Message VPN.
     */
    msgVpnName?: string;
    /**
     * Indicates whether the subscription management capability is enabled for the Client Username.
     */
    subscriptionManagerEnabled?: boolean;
}

export namespace MsgVpnClientUsername {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'MsgVpnClientUsername';


}