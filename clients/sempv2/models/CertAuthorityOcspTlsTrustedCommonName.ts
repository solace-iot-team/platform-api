/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type CertAuthorityOcspTlsTrustedCommonName = {
    /**
     * The name of the Certificate Authority. Deprecated since 2.19. Replaced by clientCertAuthorities.
     */
    certAuthorityName?: string;
    /**
     * The expected Trusted Common Name of the OCSP responder remote certificate. Deprecated since 2.19. Replaced by clientCertAuthorities.
     */
    ocspTlsTrustedCommonName?: string;
}
