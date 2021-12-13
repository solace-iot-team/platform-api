/* eslint-disable */


import type { MsgVpnAclProfileCollectionsClientconnectexceptions } from './MsgVpnAclProfileCollectionsClientconnectexceptions';
import type { MsgVpnAclProfileCollectionsPublishexceptions } from './MsgVpnAclProfileCollectionsPublishexceptions';
import type { MsgVpnAclProfileCollectionsPublishtopicexceptions } from './MsgVpnAclProfileCollectionsPublishtopicexceptions';
import type { MsgVpnAclProfileCollectionsSubscribeexceptions } from './MsgVpnAclProfileCollectionsSubscribeexceptions';
import type { MsgVpnAclProfileCollectionsSubscribesharenameexceptions } from './MsgVpnAclProfileCollectionsSubscribesharenameexceptions';
import type { MsgVpnAclProfileCollectionsSubscribetopicexceptions } from './MsgVpnAclProfileCollectionsSubscribetopicexceptions';

export type MsgVpnAclProfileCollections = {
    clientConnectExceptions?: MsgVpnAclProfileCollectionsClientconnectexceptions;
    publishExceptions?: MsgVpnAclProfileCollectionsPublishexceptions;
    publishTopicExceptions?: MsgVpnAclProfileCollectionsPublishtopicexceptions;
    subscribeExceptions?: MsgVpnAclProfileCollectionsSubscribeexceptions;
    subscribeShareNameExceptions?: MsgVpnAclProfileCollectionsSubscribesharenameexceptions;
    subscribeTopicExceptions?: MsgVpnAclProfileCollectionsSubscribetopicexceptions;
}

export namespace MsgVpnAclProfileCollections {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'MsgVpnAclProfileCollections';


}