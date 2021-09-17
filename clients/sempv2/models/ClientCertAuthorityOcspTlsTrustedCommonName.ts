/* eslint-disable */


export type ClientCertAuthorityOcspTlsTrustedCommonName = {
    /**
     * The name of the Certificate Authority.
     */
    certAuthorityName?: string;
    /**
     * The expected Trusted Common Name of the OCSP responder remote certificate.
     */
    ocspTlsTrustedCommonName?: string;
}

export namespace ClientCertAuthorityOcspTlsTrustedCommonName {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'ClientCertAuthorityOcspTlsTrustedCommonName';


}