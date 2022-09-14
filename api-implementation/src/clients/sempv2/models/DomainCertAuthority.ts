/* eslint-disable */


export type DomainCertAuthority = {
    /**
     * The name of the Certificate Authority.
     */
    certAuthorityName?: string;
    /**
     * The PEM formatted content for the trusted root certificate of a domain Certificate Authority. Changes to this attribute are synchronized to HA mates via config-sync. The default value is `""`.
     */
    certContent?: string;
}

export namespace DomainCertAuthority {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'DomainCertAuthority';


}