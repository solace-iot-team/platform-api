/* eslint-disable */


export type StandardDomainCertAuthority = {
    /**
     * The name of the Certificate Authority.
     */
    certAuthorityName?: string;
    /**
     * The PEM formatted content for the trusted root certificate of a standard domain Certificate Authority.
     */
    certContent?: string;
}

export namespace StandardDomainCertAuthority {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'StandardDomainCertAuthority';


}