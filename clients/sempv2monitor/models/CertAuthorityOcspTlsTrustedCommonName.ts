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

export namespace CertAuthorityOcspTlsTrustedCommonName {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'CertAuthorityOcspTlsTrustedCommonName';


}