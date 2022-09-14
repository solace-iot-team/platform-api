/* eslint-disable */


export type DmrClusterCertMatchingRuleLinks = {
    /**
     * The URI of this Certificate Matching Rule's collection of Certificate Matching Rule Attribute Filter objects.
     */
    attributeFiltersUri?: string;
    /**
     * The URI of this Certificate Matching Rule's collection of Certificate Matching Rule Condition objects.
     */
    conditionsUri?: string;
    /**
     * The URI of this Certificate Matching Rule object.
     */
    uri?: string;
}

export namespace DmrClusterCertMatchingRuleLinks {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'DmrClusterCertMatchingRuleLinks';


}