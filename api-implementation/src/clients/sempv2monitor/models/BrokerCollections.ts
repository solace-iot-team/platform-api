/* eslint-disable */


import type { BrokerCollectionsCertauthorities } from './BrokerCollectionsCertauthorities';
import type { BrokerCollectionsClientcertauthorities } from './BrokerCollectionsClientcertauthorities';
import type { BrokerCollectionsConfigsynclocaldatabaserows } from './BrokerCollectionsConfigsynclocaldatabaserows';
import type { BrokerCollectionsDmrclusters } from './BrokerCollectionsDmrclusters';
import type { BrokerCollectionsDomaincertauthorities } from './BrokerCollectionsDomaincertauthorities';
import type { BrokerCollectionsMsgvpns } from './BrokerCollectionsMsgvpns';
import type { BrokerCollectionsSessions } from './BrokerCollectionsSessions';
import type { BrokerCollectionsStandarddomaincertauthorities } from './BrokerCollectionsStandarddomaincertauthorities';
import type { BrokerCollectionsVirtualhostnames } from './BrokerCollectionsVirtualhostnames';

export type BrokerCollections = {
    certAuthorities?: BrokerCollectionsCertauthorities;
    clientCertAuthorities?: BrokerCollectionsClientcertauthorities;
    configSyncLocalDatabaseRows?: BrokerCollectionsConfigsynclocaldatabaserows;
    dmrClusters?: BrokerCollectionsDmrclusters;
    domainCertAuthorities?: BrokerCollectionsDomaincertauthorities;
    msgVpns?: BrokerCollectionsMsgvpns;
    sessions?: BrokerCollectionsSessions;
    standardDomainCertAuthorities?: BrokerCollectionsStandarddomaincertauthorities;
    virtualHostnames?: BrokerCollectionsVirtualhostnames;
}

export namespace BrokerCollections {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'BrokerCollections';


}