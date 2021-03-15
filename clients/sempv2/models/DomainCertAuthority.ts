/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type DomainCertAuthority = {
    /**
     * The name of the Certificate Authority.
     */
    certAuthorityName?: string;
    /**
     * The PEM formatted content for the trusted root certificate of a domain Certificate Authority. The default value is `""`.
     */
    certContent?: string;
}
