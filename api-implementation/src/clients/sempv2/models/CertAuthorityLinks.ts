/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type CertAuthorityLinks = {
    /**
     * The URI of this Certificate Authority's collection of OCSP Responder Trusted Common Name objects. Deprecated since 2.19. Replaced by clientCertAuthorities.
     */
    ocspTlsTrustedCommonNamesUri?: string;
    /**
     * The URI of this Certificate Authority object.
     */
    uri?: string;
}
