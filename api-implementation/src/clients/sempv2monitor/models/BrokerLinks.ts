/* eslint-disable */


export type BrokerLinks = {
    /**
     * The URI of this Broker's About object.
     */
    aboutUri?: string;
    /**
     * The URI of this Broker's collection of Certificate Authority objects. Deprecated since 2.19. Replaced by clientCertAuthorities and domainCertAuthorities.
     */
    certAuthoritiesUri?: string;
    /**
     * The URI of this Broker's collection of Client Certificate Authority objects. Available since 2.19.
     */
    clientCertAuthoritiesUri?: string;
    /**
     * The URI of this Broker's collection of Config Sync Local Database objects. Available since 2.22.
     */
    configSyncLocalDatabaseRowsUri?: string;
    /**
     * The URI of this Broker's collection of Cluster objects. Available since 2.11.
     */
    dmrClustersUri?: string;
    /**
     * The URI of this Broker's collection of Domain Certificate Authority objects. Available since 2.19.
     */
    domainCertAuthoritiesUri?: string;
    /**
     * The URI of this Broker's collection of Message VPN objects. Available since 2.11.
     */
    msgVpnsUri?: string;
    /**
     * The URI of this Broker's collection of Session objects. Available since 2.21.
     */
    sessionsUri?: string;
    /**
     * The URI of this Broker's collection of Standard Domain Certificate Authority objects. Available since 2.19.
     */
    standardDomainCertAuthoritiesUri?: string;
    /**
     * The URI of this Broker object.
     */
    uri?: string;
    /**
     * The URI of this Broker's collection of Virtual Hostname objects. Available since 2.17.
     */
    virtualHostnamesUri?: string;
}

export namespace BrokerLinks {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'BrokerLinks';


}