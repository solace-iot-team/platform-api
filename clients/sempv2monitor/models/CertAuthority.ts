/* eslint-disable */


export type CertAuthority = {
    /**
     * The name of the Certificate Authority. Deprecated since 2.19. Replaced by clientCertAuthorities and domainCertAuthorities.
     */
    certAuthorityName?: string;
    /**
     * The PEM formatted content for the trusted root certificate of a Certificate Authority. Deprecated since 2.19. certAuthorities replaced by clientCertAuthorities and domainCertAuthorities.
     */
    certContent?: string;
    /**
     * The scheduled CRL refresh day(s), specified as "daily" or a comma-separated list of days. Days must be specified as "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", or "Sat", with no spaces, and in sorted order from Sunday to Saturday. Deprecated since 2.19. certAuthorities replaced by clientCertAuthorities and domainCertAuthorities.
     */
    crlDayList?: string;
    /**
     * The timestamp of the last successful CRL download. This value represents the number of seconds since 1970-01-01 00:00:00 UTC (Unix time). Deprecated since 2.19. certAuthorities replaced by clientCertAuthorities and domainCertAuthorities.
     */
    crlLastDownloadTime?: number;
    /**
     * The reason for the last CRL failure. Deprecated since 2.19. certAuthorities replaced by clientCertAuthorities and domainCertAuthorities.
     */
    crlLastFailureReason?: string;
    /**
     * The timestamp of the last CRL failure. This value represents the number of seconds since 1970-01-01 00:00:00 UTC (Unix time). Deprecated since 2.19. certAuthorities replaced by clientCertAuthorities and domainCertAuthorities.
     */
    crlLastFailureTime?: number;
    /**
     * The scheduled time of the next CRL download. This value represents the number of seconds since 1970-01-01 00:00:00 UTC (Unix time). Deprecated since 2.19. certAuthorities replaced by clientCertAuthorities and domainCertAuthorities.
     */
    crlNextDownloadTime?: number;
    /**
     * The scheduled CRL refresh time(s), specified as "hourly" or a comma-separated list of 24-hour times in the form hh:mm, or h:mm. There must be no spaces, and times must be in sorted order from 0:00 to 23:59. Deprecated since 2.19. certAuthorities replaced by clientCertAuthorities and domainCertAuthorities.
     */
    crlTimeList?: string;
    /**
     * Indicates whether CRL revocation checking is operationally up. Deprecated since 2.19. certAuthorities replaced by clientCertAuthorities and domainCertAuthorities.
     */
    crlUp?: boolean;
    /**
     * The URL for the CRL source. This is a required attribute for CRL to be operational and the URL must be complete with http:// included. Deprecated since 2.19. certAuthorities replaced by clientCertAuthorities and domainCertAuthorities.
     */
    crlUrl?: string;
    /**
     * The reason for the last OCSP failure. Deprecated since 2.19. certAuthorities replaced by clientCertAuthorities and domainCertAuthorities.
     */
    ocspLastFailureReason?: string;
    /**
     * The timestamp of the last OCSP failure. This value represents the number of seconds since 1970-01-01 00:00:00 UTC (Unix time). Deprecated since 2.19. certAuthorities replaced by clientCertAuthorities and domainCertAuthorities.
     */
    ocspLastFailureTime?: number;
    /**
     * The URL involved in the last OCSP failure. Deprecated since 2.19. certAuthorities replaced by clientCertAuthorities and domainCertAuthorities.
     */
    ocspLastFailureUrl?: string;
    /**
     * Indicates whether a non-responder certificate is allowed to sign an OCSP response. Typically used with an OCSP override URL in cases where a single certificate is used to sign client certificates and OCSP responses. Deprecated since 2.19. certAuthorities replaced by clientCertAuthorities and domainCertAuthorities.
     */
    ocspNonResponderCertEnabled?: boolean;
    /**
     * The OCSP responder URL to use for overriding the one supplied in the client certificate. The URL must be complete with http:// included. Deprecated since 2.19. certAuthorities replaced by clientCertAuthorities and domainCertAuthorities.
     */
    ocspOverrideUrl?: string;
    /**
     * The timeout in seconds to receive a response from the OCSP responder after sending a request or making the initial connection attempt. Deprecated since 2.19. certAuthorities replaced by clientCertAuthorities and domainCertAuthorities.
     */
    ocspTimeout?: number;
    /**
     * Indicates whether Certificate Authority revocation checking is enabled. Deprecated since 2.19. certAuthorities replaced by clientCertAuthorities and domainCertAuthorities.
     */
    revocationCheckEnabled?: boolean;
}

export namespace CertAuthority {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'CertAuthority';


}