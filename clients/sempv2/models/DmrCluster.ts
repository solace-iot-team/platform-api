/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export interface DmrCluster {
    /**
     * Enable or disable basic authentication for Cluster Links. The default value is `true`.
     */
    authenticationBasicEnabled?: boolean;
    /**
     * The password used to authenticate incoming Cluster Links when using basic internal authentication. The same password is also used by outgoing Cluster Links if a per-Link password is not configured. This attribute is absent from a GET and not updated when absent in a PUT. The default is to have no `authenticationBasicPassword`.
     */
    authenticationBasicPassword?: string;
    /**
     * The type of basic authentication to use for Cluster Links. The default value is `"internal"`. The allowed values and their meaning are:
     *
     * <pre>
     * "internal" - Use locally configured password.
     * "none" - No authentication.
     * </pre>
     *
     */
    authenticationBasicType?: DmrCluster.authenticationBasicType;
    /**
     * The PEM formatted content for the client certificate used to login to the remote node. It must consist of a private key and between one and three certificates comprising the certificate trust chain. This attribute is absent from a GET and not updated when absent in a PUT. Changing this attribute requires an HTTPS connection. The default value is `""`.
     */
    authenticationClientCertContent?: string;
    /**
     * Enable or disable client certificate authentication for Cluster Links. The default value is `true`.
     */
    authenticationClientCertEnabled?: boolean;
    /**
     * The password for the client certificate. This attribute is absent from a GET and not updated when absent in a PUT. Changing this attribute requires an HTTPS connection. The default value is `""`.
     */
    authenticationClientCertPassword?: string;
    /**
     * Enable or disable direct messaging only. Guaranteed messages will not be transmitted through the cluster. The default value is `false`.
     */
    directOnlyEnabled?: boolean;
    /**
     * The name of the Cluster.
     */
    dmrClusterName?: string;
    /**
     * Enable or disable the Cluster. The default value is `false`.
     */
    enabled?: boolean;
    /**
     * The name of this node in the Cluster. This is the name that this broker (or redundant group of brokers) is know by to other nodes in the Cluster. The name is chosen automatically to be either this broker's Router Name or Mate Router Name, depending on which Active Standby Role (primary or backup) this broker plays in its redundancy group.
     */
    nodeName?: string;
    /**
     * Enable or disable the enforcing of the common name provided by the remote broker against the list of trusted common names configured for the Link. If enabled, the certificate's common name must match one of the trusted common names for the Link to be accepted. The default value is `true`.
     */
    tlsServerCertEnforceTrustedCommonNameEnabled?: boolean;
    /**
     * The maximum allowed depth of a certificate chain. The depth of a chain is defined as the number of signing CA certificates that are present in the chain back to a trusted self-signed root CA certificate. The default value is `3`.
     */
    tlsServerCertMaxChainDepth?: number;
    /**
     * Enable or disable the validation of the "Not Before" and "Not After" validity dates in the certificate. When disabled, the certificate is accepted even if the certificate is not valid based on these dates. The default value is `true`.
     */
    tlsServerCertValidateDateEnabled?: boolean;
}

export namespace DmrCluster {

    /**
     * The type of basic authentication to use for Cluster Links. The default value is `"internal"`. The allowed values and their meaning are:
     *
     * <pre>
     * "internal" - Use locally configured password.
     * "none" - No authentication.
     * </pre>
     *
     */
    export enum authenticationBasicType {
        INTERNAL = 'internal',
        NONE = 'none',
    }


}
