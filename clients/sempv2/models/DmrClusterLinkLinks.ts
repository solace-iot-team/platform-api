/* eslint-disable */


export type DmrClusterLinkLinks = {
    /**
     * The URI of this Link's collection of Link Attribute objects. Available since 2.28.
     */
    attributesUri?: string;
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

export namespace DmrClusterLinkLinks {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'DmrClusterLinkLinks';


}