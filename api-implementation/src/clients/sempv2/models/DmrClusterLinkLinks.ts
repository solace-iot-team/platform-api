/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export interface DmrClusterLinkLinks {
    /**
     * The URI of this Link's collection of Remote Address objects.
     */
    remoteAddressesUri?: string;
    /**
     * The URI of this Link's collection of Trusted Common Name objects. Deprecated since 2.18. Common Name validation has been replaced by Server Certificate Name validation.
     */
    tlsTrustedCommonNamesUri?: string;
    /**
     * The URI of this Link object.
     */
    uri?: string;
}
