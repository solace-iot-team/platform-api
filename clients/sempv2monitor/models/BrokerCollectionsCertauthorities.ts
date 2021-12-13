/* eslint-disable */


export type BrokerCollectionsCertauthorities = {
    /**
     * The total number of objects in the certAuthorities collection. Deprecated since 2.19. Replaced by clientCertAuthorities and domainCertAuthorities.
     */
    count?: number;
}

export namespace BrokerCollectionsCertauthorities {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'BrokerCollectionsCertauthorities';


}