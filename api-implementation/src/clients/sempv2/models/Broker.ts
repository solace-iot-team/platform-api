/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export interface Broker {
    /**
     * The client certificate revocation checking mode used when a client authenticates with a client certificate. The default value is `"none"`. The allowed values and their meaning are:
     *
     * <pre>
     * "none" - Do not perform any certificate revocation checking.
     * "ocsp" - Use the Open Certificate Status Protcol (OCSP) for certificate revocation checking.
     * "crl" - Use Certificate Revocation Lists (CRL) for certificate revocation checking.
     * "ocsp-crl" - Use OCSP first, but if OCSP fails to return an unambiguous result, then check via CRL.
     * </pre>
     *
     */
    authClientCertRevocationCheckMode?: Broker.authClientCertRevocationCheckMode;
    /**
     * Enable or disable the blocking of TLS version 1.1 connections. When blocked, all existing incoming and outgoing TLS 1.1 connections with Clients, SEMP users, and LDAP servers remain connected while new connections are blocked. Note that support for TLS 1.1 will eventually be discontinued, at which time TLS 1.1 connections will be blocked regardless of this setting. The default value is `false`.
     */
    tlsBlockVersion11Enabled?: boolean;
    /**
     * The colon-separated list of cipher suites used for TLS management connections (e.g. SEMP, LDAP). The value "default" implies all supported suites ordered from most secure to least secure. The default value is `"default"`.
     */
    tlsCipherSuiteManagementList?: string;
    /**
     * The colon-separated list of cipher suites used for TLS data connections (e.g. client pub/sub). The value "default" implies all supported suites ordered from most secure to least secure. The default value is `"default"`.
     */
    tlsCipherSuiteMsgBackboneList?: string;
    /**
     * The colon-separated list of cipher suites used for TLS secure shell connections (e.g. SSH, SFTP, SCP). The value "default" implies all supported suites ordered from most secure to least secure. The default value is `"default"`.
     */
    tlsCipherSuiteSecureShellList?: string;
    /**
     * Enable or disable protection against the CRIME exploit. When enabled, TLS+compressed messaging performance is degraded. This protection should only be disabled if sufficient ACL and authentication features are being employed such that a potential attacker does not have sufficient access to trigger the exploit. The default value is `true`.
     */
    tlsCrimeExploitProtectionEnabled?: boolean;
    /**
     * The PEM formatted content for the server certificate used for TLS connections. It must consist of a private key and between one and three certificates comprising the certificate trust chain. This attribute is absent from a GET and not updated when absent in a PUT. Changing this attribute requires an HTTPS connection. The default value is `""`.
     */
    tlsServerCertContent?: string;
    /**
     * The password for the server certificate used for TLS connections. This attribute is absent from a GET and not updated when absent in a PUT. Changing this attribute requires an HTTPS connection. The default value is `""`.
     */
    tlsServerCertPassword?: string;
    /**
     * The TLS ticket lifetime in seconds. When a client connects with TLS, a session with a session ticket is created using the TLS ticket lifetime which determines how long the client has to resume the session. The default value is `86400`.
     */
    tlsTicketLifetime?: number;
}

export namespace Broker {

    /**
     * The client certificate revocation checking mode used when a client authenticates with a client certificate. The default value is `"none"`. The allowed values and their meaning are:
     *
     * <pre>
     * "none" - Do not perform any certificate revocation checking.
     * "ocsp" - Use the Open Certificate Status Protcol (OCSP) for certificate revocation checking.
     * "crl" - Use Certificate Revocation Lists (CRL) for certificate revocation checking.
     * "ocsp-crl" - Use OCSP first, but if OCSP fails to return an unambiguous result, then check via CRL.
     * </pre>
     *
     */
    export enum authClientCertRevocationCheckMode {
        NONE = 'none',
        OCSP = 'ocsp',
        CRL = 'crl',
        OCSP_CRL = 'ocsp-crl',
    }


}
