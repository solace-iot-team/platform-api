/* eslint-disable */


export type MsgVpnCertMatchingRuleLinks = {
    /**
     * The URI of this Certificate Matching Rule's collection of Certificate Matching Rule Attribute Filter objects. Available since 2.28.
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

export namespace MsgVpnCertMatchingRuleLinks {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'MsgVpnCertMatchingRuleLinks';


}