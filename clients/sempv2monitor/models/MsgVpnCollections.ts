/* eslint-disable */


import type { MsgVpnCollectionsAclprofiles } from './MsgVpnCollectionsAclprofiles';
import type { MsgVpnCollectionsAuthenticationoauthproviders } from './MsgVpnCollectionsAuthenticationoauthproviders';
import type { MsgVpnCollectionsAuthorizationgroups } from './MsgVpnCollectionsAuthorizationgroups';
import type { MsgVpnCollectionsBridges } from './MsgVpnCollectionsBridges';
import type { MsgVpnCollectionsClientprofiles } from './MsgVpnCollectionsClientprofiles';
import type { MsgVpnCollectionsClients } from './MsgVpnCollectionsClients';
import type { MsgVpnCollectionsClientusernames } from './MsgVpnCollectionsClientusernames';
import type { MsgVpnCollectionsConfigsyncremotenodes } from './MsgVpnCollectionsConfigsyncremotenodes';
import type { MsgVpnCollectionsDistributedcaches } from './MsgVpnCollectionsDistributedcaches';
import type { MsgVpnCollectionsDmrbridges } from './MsgVpnCollectionsDmrbridges';
import type { MsgVpnCollectionsJndiconnectionfactories } from './MsgVpnCollectionsJndiconnectionfactories';
import type { MsgVpnCollectionsJndiqueues } from './MsgVpnCollectionsJndiqueues';
import type { MsgVpnCollectionsJnditopics } from './MsgVpnCollectionsJnditopics';
import type { MsgVpnCollectionsMqttretaincaches } from './MsgVpnCollectionsMqttretaincaches';
import type { MsgVpnCollectionsMqttsessions } from './MsgVpnCollectionsMqttsessions';
import type { MsgVpnCollectionsQueues } from './MsgVpnCollectionsQueues';
import type { MsgVpnCollectionsQueuetemplates } from './MsgVpnCollectionsQueuetemplates';
import type { MsgVpnCollectionsReplaylogs } from './MsgVpnCollectionsReplaylogs';
import type { MsgVpnCollectionsReplicatedtopics } from './MsgVpnCollectionsReplicatedtopics';
import type { MsgVpnCollectionsRestdeliverypoints } from './MsgVpnCollectionsRestdeliverypoints';
import type { MsgVpnCollectionsTopicendpoints } from './MsgVpnCollectionsTopicendpoints';
import type { MsgVpnCollectionsTopicendpointtemplates } from './MsgVpnCollectionsTopicendpointtemplates';
import type { MsgVpnCollectionsTransactions } from './MsgVpnCollectionsTransactions';

export type MsgVpnCollections = {
    aclProfiles?: MsgVpnCollectionsAclprofiles;
    authenticationOauthProviders?: MsgVpnCollectionsAuthenticationoauthproviders;
    authorizationGroups?: MsgVpnCollectionsAuthorizationgroups;
    bridges?: MsgVpnCollectionsBridges;
    clientProfiles?: MsgVpnCollectionsClientprofiles;
    clientUsernames?: MsgVpnCollectionsClientusernames;
    clients?: MsgVpnCollectionsClients;
    configSyncRemoteNodes?: MsgVpnCollectionsConfigsyncremotenodes;
    distributedCaches?: MsgVpnCollectionsDistributedcaches;
    dmrBridges?: MsgVpnCollectionsDmrbridges;
    jndiConnectionFactories?: MsgVpnCollectionsJndiconnectionfactories;
    jndiQueues?: MsgVpnCollectionsJndiqueues;
    jndiTopics?: MsgVpnCollectionsJnditopics;
    mqttRetainCaches?: MsgVpnCollectionsMqttretaincaches;
    mqttSessions?: MsgVpnCollectionsMqttsessions;
    queueTemplates?: MsgVpnCollectionsQueuetemplates;
    queues?: MsgVpnCollectionsQueues;
    replayLogs?: MsgVpnCollectionsReplaylogs;
    replicatedTopics?: MsgVpnCollectionsReplicatedtopics;
    restDeliveryPoints?: MsgVpnCollectionsRestdeliverypoints;
    topicEndpointTemplates?: MsgVpnCollectionsTopicendpointtemplates;
    topicEndpoints?: MsgVpnCollectionsTopicendpoints;
    transactions?: MsgVpnCollectionsTransactions;
}

export namespace MsgVpnCollections {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'MsgVpnCollections';


}