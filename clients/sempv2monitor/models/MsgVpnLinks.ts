/* eslint-disable */


export type MsgVpnLinks = {
    /**
     * The URI of this Message VPN's collection of ACL Profile objects.
     */
    aclProfilesUri?: string;
    /**
     * The URI of this Message VPN's collection of OAuth Provider objects. Available since 2.13.
     */
    authenticationOauthProvidersUri?: string;
    /**
     * The URI of this Message VPN's collection of LDAP Authorization Group objects.
     */
    authorizationGroupsUri?: string;
    /**
     * The URI of this Message VPN's collection of Bridge objects.
     */
    bridgesUri?: string;
    /**
     * The URI of this Message VPN's collection of Client Profile objects.
     */
    clientProfilesUri?: string;
    /**
     * The URI of this Message VPN's collection of Client Username objects.
     */
    clientUsernamesUri?: string;
    /**
     * The URI of this Message VPN's collection of Client objects. Available since 2.12.
     */
    clientsUri?: string;
    /**
     * The URI of this Message VPN's collection of Config Sync Remote Node objects. Deprecated since 2.22. This attribute has been deprecated.
     */
    configSyncRemoteNodesUri?: string;
    /**
     * The URI of this Message VPN's collection of Distributed Cache objects.
     */
    distributedCachesUri?: string;
    /**
     * The URI of this Message VPN's collection of DMR Bridge objects.
     */
    dmrBridgesUri?: string;
    /**
     * The URI of this Message VPN's collection of JNDI Connection Factory objects.
     */
    jndiConnectionFactoriesUri?: string;
    /**
     * The URI of this Message VPN's collection of JNDI Queue objects.
     */
    jndiQueuesUri?: string;
    /**
     * The URI of this Message VPN's collection of JNDI Topic objects.
     */
    jndiTopicsUri?: string;
    /**
     * The URI of this Message VPN's collection of MQTT Retain Cache objects.
     */
    mqttRetainCachesUri?: string;
    /**
     * The URI of this Message VPN's collection of MQTT Session objects.
     */
    mqttSessionsUri?: string;
    /**
     * The URI of this Message VPN's collection of Queue Template objects. Available since 2.14.
     */
    queueTemplatesUri?: string;
    /**
     * The URI of this Message VPN's collection of Queue objects. Available since 2.12.
     */
    queuesUri?: string;
    /**
     * The URI of this Message VPN's collection of Replay Log objects.
     */
    replayLogsUri?: string;
    /**
     * The URI of this Message VPN's collection of Replicated Topic objects. Available since 2.12.
     */
    replicatedTopicsUri?: string;
    /**
     * The URI of this Message VPN's collection of REST Delivery Point objects.
     */
    restDeliveryPointsUri?: string;
    /**
     * The URI of this Message VPN's collection of Topic Endpoint Template objects. Available since 2.14.
     */
    topicEndpointTemplatesUri?: string;
    /**
     * The URI of this Message VPN's collection of Topic Endpoint objects. Available since 2.12.
     */
    topicEndpointsUri?: string;
    /**
     * The URI of this Message VPN's collection of Replicated Local Transaction or XA Transaction objects. Available since 2.12.
     */
    transactionsUri?: string;
    /**
     * The URI of this Message VPN object.
     */
    uri?: string;
}

export namespace MsgVpnLinks {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'MsgVpnLinks';


}