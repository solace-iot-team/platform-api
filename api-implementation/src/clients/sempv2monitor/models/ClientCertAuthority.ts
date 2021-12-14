/* eslint-disable */


export type ClientCertAuthority = {
    /**
     * The name of the Certificate Authority.
     */
    certAuthorityName?: string;
    /**
     * The PEM formatted content for the trusted root certificate of a client Certificate Authority.
     */
    certContent?: string;
    /**
     * The scheduled CRL refresh day(s), specified as "daily" or a comma-separated list of days. Days must be specified as "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", or "Sat", with no spaces, and in sorted order from Sunday to Saturday.
     */
    crlDayList?: string;
    /**
     * The timestamp of the last successful CRL download. This value represents the number of seconds since 1970-01-01 00:00:00 UTC (Unix time).
     */
    crlLastDownloadTime?: number;
    /**
     * The reason for the last CRL failure.
     */
    crlLastFailureReason?: string;
    /**
     * The timestamp of the last CRL failure. This value represents the number of seconds since 1970-01-01 00:00:00 UTC (Unix time).
     */
    crlLastFailureTime?: number;
    /**
     * The scheduled time of the next CRL download. This value represents the number of seconds since 1970-01-01 00:00:00 UTC (Unix time).
     */
    crlNextDownloadTime?: number;
    /**
     * The scheduled CRL refresh time(s), specified as "hourly" or a comma-separated list of 24-hour times in the form hh:mm, or h:mm. There must be no spaces, and times must be in sorted order from 0:00 to 23:59.
     */
    crlTimeList?: string;
    /**
     * Indicates whether CRL revocation checking is operationally up.
     */
    crlUp?: boolean;
    /**
     * The URL for the CRL source. This is a required attribute for CRL to be operational and the URL must be complete with http:// included.
     */
    crlUrl?: string;
    /**
     * The reason for the last OCSP failure.
     */
    ocspLastFailureReason?: string;
    /**
     * The timestamp of the last OCSP failure. This value represents the number of seconds since 1970-01-01 00:00:00 UTC (Unix time).
     */
    ocspLastFailureTime?: number;
    /**
     * The URL involved in the last OCSP failure.
     */
    ocspLastFailureUrl?: string;
    /**
     * Indicates whether a non-responder certificate is allowed to sign an OCSP response. Typically used with an OCSP override URL in cases where a single certificate is used to sign client certificates and OCSP responses.
     */
    ocspNonResponderCertEnabled?: boolean;
    /**
     * The OCSP responder URL to use for overriding the one supplied in the client certificate. The URL must be complete with http:// included.
     */
    ocspOverrideUrl?: string;
    /**
     * The timeout in seconds to receive a response from the OCSP responder after sending a request or making the initial connection attempt.
     */
    ocspTimeout?: number;
    /**
     * Indicates whether Certificate Authority revocation checking is enabled.
     */
    revocationCheckEnabled?: boolean;
}

export namespace ClientCertAuthority {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'ClientCertAuthority';


}