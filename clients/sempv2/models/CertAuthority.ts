/* eslint-disable */


export type CertAuthority = {
    /**
     * The name of the Certificate Authority. Deprecated since 2.19. Replaced by clientCertAuthorities and domainCertAuthorities.
     */
    certAuthorityName?: string;
    /**
     * The PEM formatted content for the trusted root certificate of a Certificate Authority. Changes to this attribute are synchronized to HA mates via config-sync. The default value is `""`. Deprecated since 2.19. certAuthorities replaced by clientCertAuthorities and domainCertAuthorities.
     */
    certContent?: string;
    /**
     * The scheduled CRL refresh day(s), specified as "daily" or a comma-separated list of days. Days must be specified as "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", or "Sat", with no spaces, and in sorted order from Sunday to Saturday. Changes to this attribute are synchronized to HA mates via config-sync. The default value is `"daily"`. Deprecated since 2.19. certAuthorities replaced by clientCertAuthorities and domainCertAuthorities.
     */
    crlDayList?: string;
    /**
     * The scheduled CRL refresh time(s), specified as "hourly" or a comma-separated list of 24-hour times in the form hh:mm, or h:mm. There must be no spaces, and times must be in sorted order from 0:00 to 23:59. Changes to this attribute are synchronized to HA mates via config-sync. The default value is `"3:00"`. Deprecated since 2.19. certAuthorities replaced by clientCertAuthorities and domainCertAuthorities.
     */
    crlTimeList?: string;
    /**
     * The URL for the CRL source. This is a required attribute for CRL to be operational and the URL must be complete with http:// included. Changes to this attribute are synchronized to HA mates via config-sync. The default value is `""`. Deprecated since 2.19. certAuthorities replaced by clientCertAuthorities and domainCertAuthorities.
     */
    crlUrl?: string;
    /**
     * Enable or disable allowing a non-responder certificate to sign an OCSP response. Typically used with an OCSP override URL in cases where a single certificate is used to sign client certificates and OCSP responses. Changes to this attribute are synchronized to HA mates via config-sync. The default value is `false`. Deprecated since 2.19. certAuthorities replaced by clientCertAuthorities and domainCertAuthorities.
     */
    ocspNonResponderCertEnabled?: boolean;
    /**
     * The OCSP responder URL to use for overriding the one supplied in the client certificate. The URL must be complete with http:// included. Changes to this attribute are synchronized to HA mates via config-sync. The default value is `""`. Deprecated since 2.19. certAuthorities replaced by clientCertAuthorities and domainCertAuthorities.
     */
    ocspOverrideUrl?: string;
    /**
     * The timeout in seconds to receive a response from the OCSP responder after sending a request or making the initial connection attempt. Changes to this attribute are synchronized to HA mates via config-sync. The default value is `5`. Deprecated since 2.19. certAuthorities replaced by clientCertAuthorities and domainCertAuthorities.
     */
    ocspTimeout?: number;
    /**
     * Enable or disable Certificate Authority revocation checking. Changes to this attribute are synchronized to HA mates via config-sync. The default value is `false`. Deprecated since 2.19. certAuthorities replaced by clientCertAuthorities and domainCertAuthorities.
     */
    revocationCheckEnabled?: boolean;
}

export namespace CertAuthority {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'CertAuthority';


}