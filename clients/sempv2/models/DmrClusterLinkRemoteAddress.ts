/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type DmrClusterLinkRemoteAddress = {
    /**
     * The name of the Cluster.
     */
    dmrClusterName?: string;
    /**
     * The FQDN or IP address (and optional port) of the remote node. If a port is not provided, it will vary based on the transport encoding: 55555 (plain-text), 55443 (encrypted), or 55003 (compressed).
     */
    remoteAddress?: string;
    /**
     * The name of the node at the remote end of the Link.
     */
    remoteNodeName?: string;
}
