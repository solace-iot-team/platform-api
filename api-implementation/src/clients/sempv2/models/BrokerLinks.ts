/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export interface BrokerLinks {
    /**
     * The URI of this Broker's About object.
     */
    aboutUri?: string;
    /**
     * The URI of this Broker's collection of Certificate Authority objects.
     */
    certAuthoritiesUri?: string;
    /**
     * The URI of this Broker's collection of Cluster objects. Available since 2.11.
     */
    dmrClustersUri?: string;
    /**
     * The URI of this Broker's collection of Message VPN objects. Available since 2.0.
     */
    msgVpnsUri?: string;
    /**
     * The URI of this Broker object.
     */
    uri?: string;
}
