/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export interface DmrClusterLinkTlsTrustedCommonName {
    /**
     * The name of the Cluster.
     */
    dmrClusterName?: string;
    /**
     * The name of the node at the remote end of the Link.
     */
    remoteNodeName?: string;
    /**
     * The expected trusted common name of the remote certificate.
     */
    tlsTrustedCommonName?: string;
}
