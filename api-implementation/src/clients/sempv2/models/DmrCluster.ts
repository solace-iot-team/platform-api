/* eslint-disable */


export type DmrCluster = {
    /**
     * Enable or disable basic authentication for Cluster Links. Changes to this attribute are synchronized to HA mates via config-sync. The default value is `true`.
     */
    authenticationBasicEnabled?: boolean;
    /**
     * The password used to authenticate incoming Cluster Links when using basic internal authentication. The same password is also used by outgoing Cluster Links if a per-Link password is not configured. This attribute is absent from a GET and not updated when absent in a PUT, subject to the exceptions in note 4. Changes to this attribute are synchronized to HA mates via config-sync. The default value is `""`.
     */
    authenticationBasicPassword?: string;
    /**
     * The type of basic authentication to use for Cluster Links. Changes to this attribute are synchronized to HA mates via config-sync. The default value is `"internal"`. The allowed values and their meaning are:
     *
     * <pre>
     * "internal" - Use locally configured password.
     * "none" - No authentication.
     * </pre>
     *
     */
    authenticationBasicType?: DmrCluster.authenticationBasicType;
    /**
     * The PEM formatted content for the client certificate used to login to the remote node. It must consist of a private key and between one and three certificates comprising the certificate trust chain. This attribute is absent from a GET and not updated when absent in a PUT, subject to the exceptions in note 4. Changing this attribute requires an HTTPS connection. The default value is `""`.
     */
    authenticationClientCertContent?: string;
    /**
     * Enable or disable client certificate authentication for Cluster Links. Changes to this attribute are synchronized to HA mates via config-sync. The default value is `true`.
     */
    authenticationClientCertEnabled?: boolean;
    /**
     * The password for the client certificate. This attribute is absent from a GET and not updated when absent in a PUT, subject to the exceptions in note 4. Changing this attribute requires an HTTPS connection. The default value is `""`.
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
     * Enable or disable the Cluster. Changes to this attribute are synchronized to HA mates via config-sync. The default value is `false`.
     */
    enabled?: boolean;
    /**
     * The name of this node in the Cluster. This is the name that this broker (or redundant group of brokers) is know by to other nodes in the Cluster. The name is chosen automatically to be either this broker's Router Name or Mate Router Name, depending on which Active Standby Role (primary or backup) this broker plays in its redundancy group.
     */
    nodeName?: string;
    /**
     * Enable or disable the enforcing of the common name provided by the remote broker against the list of trusted common names configured for the Link. If enabled, the certificate's common name must match one of the trusted common names for the Link to be accepted. Common Name validation is not performed if Server Certificate Name Validation is enabled, even if Common Name validation is enabled. Changes to this attribute are synchronized to HA mates via config-sync. The default value is `false`. Deprecated since 2.18. Common Name validation has been replaced by Server Certificate Name validation.
     */
    tlsServerCertEnforceTrustedCommonNameEnabled?: boolean;
    /**
     * The maximum allowed depth of a certificate chain. The depth of a chain is defined as the number of signing CA certificates that are present in the chain back to a trusted self-signed root CA certificate. Changes to this attribute are synchronized to HA mates via config-sync. The default value is `3`.
     */
    tlsServerCertMaxChainDepth?: number;
    /**
     * Enable or disable the validation of the "Not Before" and "Not After" validity dates in the certificate. When disabled, the certificate is accepted even if the certificate is not valid based on these dates. Changes to this attribute are synchronized to HA mates via config-sync. The default value is `true`.
     */
    tlsServerCertValidateDateEnabled?: boolean;
    /**
     * Enable or disable the standard TLS authentication mechanism of verifying the name used to connect to the bridge. If enabled, the name used to connect to the bridge is checked against the names specified in the certificate returned by the remote router. Legacy Common Name validation is not performed if Server Certificate Name Validation is enabled, even if Common Name validation is also enabled. Changes to this attribute are synchronized to HA mates via config-sync. The default value is `true`. Available since 2.18.
     */
    tlsServerCertValidateNameEnabled?: boolean;
}

export namespace DmrCluster {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'DmrCluster';

    /**
     * The type of basic authentication to use for Cluster Links. Changes to this attribute are synchronized to HA mates via config-sync. The default value is `"internal"`. The allowed values and their meaning are:
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