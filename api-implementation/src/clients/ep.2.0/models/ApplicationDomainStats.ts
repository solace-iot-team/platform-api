/* eslint-disable */


export type ApplicationDomainStats = {
    schemaCount?: number;
    eventCount?: number;
    applicationCount?: number;
    enumCount?: number;
    eventApiCount?: number;
}

export namespace ApplicationDomainStats {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'ApplicationDomainStats';


}