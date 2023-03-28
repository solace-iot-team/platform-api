/* eslint-disable */


export type OrgStats = {
    readonly schemaCount?: number;
    readonly schemaVersionCount?: number;
    readonly eventCount?: number;
    readonly eventVersionCount?: number;
    readonly applicationCount?: number;
    readonly applicationVersionCount?: number;
    readonly applicationDomainCount?: number;
    readonly eventApiCount?: number;
    readonly eventApiVersionCount?: number;
    readonly subscriptionCount?: number;
    readonly consumerCount?: number;
    readonly enumCount?: number;
    readonly enumVersionCount?: number;
    readonly enumValueCount?: number;
    readonly eventApiProductCount?: number;
    readonly eventApiProductVersionCount?: number;
    readonly publishedEventApiProductVersionCount?: number;
    readonly environmentCount?: number;
    readonly eventMeshCount?: number;
    readonly applicationVersionsInEventMeshesCount?: number;
    readonly customAttributeDefinitionCount?: number;
    readonly customAttributeCount?: number;
    readonly configurationCount?: number;
    readonly sumUniqueEventsInEachEnvironmentCount?: number;
    readonly sumUniqueSchemasInEachEnvironmentCount?: number;
    readonly sumUniqueApplicationsInEachEnvironmentCount?: number;
    readonly messageServiceCount?: number;
    readonly caGlobalDefParentCount?: number;
    readonly caGlobalParentValueCount?: number;
    readonly caGlobalDefVersionCount?: number;
    readonly caGlobalVersionValueCount?: number;
    readonly caAppDomainScopedDefParentCount?: number;
    readonly caAppDomainScopedParentValueCount?: number;
    readonly caAppDomainScopedDefVersionCount?: number;
    readonly caAppDomainScopedVersionValueCount?: number;
    readonly caAppDomainScopedAppDomainValueCount?: number;
    readonly caAppDomainScopedAppDomainDefCount?: number;
    readonly caGlobalAppDomainValueCount?: number;
    readonly caGlobalAppDomainDefCount?: number;
}

export namespace OrgStats {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'OrgStats';


}