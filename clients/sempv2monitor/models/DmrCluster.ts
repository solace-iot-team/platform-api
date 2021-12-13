/* eslint-disable */


export type DmrCluster = {
    /**
     * Indicates whether basic authentication is enabled for Cluster Links.
     */
    authenticationBasicEnabled?: boolean;
    /**
     * The type of basic authentication to use for Cluster Links. The allowed values and their meaning are:
     *
     * <pre>
     * "internal" - Use locally configured password.
     * "none" - No authentication.
     * </pre>
     *
     */
    authenticationBasicType?: DmrCluster.authenticationBasicType;
    /**
     * Indicates whether client certificate authentication is enabled for Cluster Links.
     */
    authenticationClientCertEnabled?: boolean;
    /**
     * Indicates whether this cluster only supports direct messaging. If true, guaranteed messages will not be transmitted through the cluster.
     */
    directOnlyEnabled?: boolean;
    /**
     * The name of the Cluster.
     */
    dmrClusterName?: string;
    /**
     * Indicates whether the Cluster is enabled.
     */
    enabled?: boolean;
    /**
     * The failure reason for the Cluster being down.
     */
    failureReason?: string;
    /**
     * The name of this node in the Cluster. This is the name that this broker (or redundant group of brokers) is know by to other nodes in the Cluster. The name is chosen automatically to be either this broker's Router Name or Mate Router Name, depending on which Active Standby Role (primary or backup) this broker plays in its redundancy group.
     */
    nodeName?: string;
    /**
     * Cluster Subscription Database build completion percentage. Available since 2.20.
     */
    subscriptionDbBuildPercentage?: number;
    /**
     * Indicates whether the common name provided by the remote broker is enforced against the list of trusted common names configured for the Link. If enabled, the certificate's common name must match one of the trusted common names for the Link to be accepted. Deprecated since 2.18. Common Name validation has been replaced by Server Certificate Name validation.
     */
    tlsServerCertEnforceTrustedCommonNameEnabled?: boolean;
    /**
     * The maximum allowed depth of a certificate chain. The depth of a chain is defined as the number of signing CA certificates that are present in the chain back to a trusted self-signed root CA certificate.
     */
    tlsServerCertMaxChainDepth?: number;
    /**
     * Indicates whether validation of the "Not Before" and "Not After" validity dates in the certificate is enabled. When disabled, the certificate is accepted even if the certificate is not valid based on these dates.
     */
    tlsServerCertValidateDateEnabled?: boolean;
    /**
     * Enable or disable the standard TLS authentication mechanism of verifying the name used to connect to the bridge. If enabled, the name used to connect to the bridge is checked against the names specified in the certificate returned by the remote router. Legacy Common Name validation is not performed if Server Certificate Name Validation is enabled, even if Common Name validation is also enabled. Available since 2.18.
     */
    tlsServerCertValidateNameEnabled?: boolean;
    /**
     * Indicates whether the Cluster is operationally up.
     */
    up?: boolean;
    /**
     * The amount of time in seconds since the Cluster was up.
     */
    uptime?: number;
}

export namespace DmrCluster {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'DmrCluster';

    /**
     * The type of basic authentication to use for Cluster Links. The allowed values and their meaning are:
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