/* eslint-disable */


export type ClientCertAuthorityLinks = {
    /**
     * The URI of this Client Certificate Authority's collection of OCSP Responder Trusted Common Name objects.
     */
    ocspTlsTrustedCommonNamesUri?: string;
    /**
     * The URI of this Client Certificate Authority object.
     */
    uri?: string;
}

export namespace ClientCertAuthorityLinks {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'ClientCertAuthorityLinks';


}