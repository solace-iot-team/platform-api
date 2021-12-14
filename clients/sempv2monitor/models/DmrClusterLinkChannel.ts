/* eslint-disable */


export type DmrClusterLinkChannel = {
    /**
     * The name of the Bridge used by the Channel.
     */
    bridgeName?: string;
    /**
     * The name of the Client used by the Channel.
     */
    clientName?: string;
    /**
     * The name of the Cluster.
     */
    dmrClusterName?: string;
    /**
     * Indicates whether the local node established the Channel.
     */
    establisher?: boolean;
    /**
     * The failure reason for the Channel being down.
     */
    failureReason?: string;
    /**
     * The name of the Message VPN.
     */
    msgVpnName?: string;
    /**
     * The name of the Queue used by the Channel.
     */
    queueName?: string;
    /**
     * The FQDN or IP address (and optional port) of the remote node.
     */
    remoteAddress?: string;
    /**
     * The name of the node at the remote end of the Link.
     */
    remoteNodeName?: string;
    /**
     * Indicates whether the Channel is operationally up.
     */
    up?: boolean;
    /**
     * The amount of time in seconds since the Channel was up.
     */
    uptime?: number;
}

export namespace DmrClusterLinkChannel {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'DmrClusterLinkChannel';


}