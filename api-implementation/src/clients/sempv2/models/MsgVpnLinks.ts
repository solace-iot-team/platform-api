/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export interface MsgVpnLinks {
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
     * The URI of this Message VPN's collection of Distributed Cache objects. Available since 2.11.
     */
    distributedCachesUri?: string;
    /**
     * The URI of this Message VPN's collection of DMR Bridge objects. Available since 2.11.
     */
    dmrBridgesUri?: string;
    /**
     * The URI of this Message VPN's collection of JNDI Connection Factory objects. Available since 2.2.
     */
    jndiConnectionFactoriesUri?: string;
    /**
     * The URI of this Message VPN's collection of JNDI Queue objects. Available since 2.2.
     */
    jndiQueuesUri?: string;
    /**
     * The URI of this Message VPN's collection of JNDI Topic objects. Available since 2.2.
     */
    jndiTopicsUri?: string;
    /**
     * The URI of this Message VPN's collection of MQTT Retain Cache objects. Available since 2.11.
     */
    mqttRetainCachesUri?: string;
    /**
     * The URI of this Message VPN's collection of MQTT Session objects. Available since 2.1.
     */
    mqttSessionsUri?: string;
    /**
     * The URI of this Message VPN's collection of Queue objects.
     */
    queuesUri?: string;
    /**
     * The URI of this Message VPN's collection of Replay Log objects. Available since 2.10.
     */
    replayLogsUri?: string;
    /**
     * The URI of this Message VPN's collection of Replicated Topic objects. Available since 2.1.
     */
    replicatedTopicsUri?: string;
    /**
     * The URI of this Message VPN's collection of REST Delivery Point objects.
     */
    restDeliveryPointsUri?: string;
    /**
     * The URI of this Message VPN's collection of Sequenced Topic objects.
     */
    sequencedTopicsUri?: string;
    /**
     * The URI of this Message VPN's collection of Topic Endpoint objects. Available since 2.1.
     */
    topicEndpointsUri?: string;
    /**
     * The URI of this Message VPN object.
     */
    uri?: string;
}
