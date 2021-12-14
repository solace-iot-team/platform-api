/* eslint-disable */


export type MsgVpnTransactionConsumerMsg = {
    /**
     * The name of the Queue or Topic Endpoint source.
     */
    endpointName?: string;
    /**
     * The type of endpoint source. The allowed values and their meaning are:
     *
     * <pre>
     * "queue" - The Message is from a Queue.
     * "topic-endpoint" - The Message is from a Topic Endpoint.
     * </pre>
     *
     */
    endpointType?: string;
    /**
     * The identifier (ID) of the Message.
     */
    msgId?: number;
    /**
     * The name of the Message VPN.
     */
    msgVpnName?: string;
    /**
     * An ID that uniquely identifies this message within this replication group. Available since 2.21.
     */
    replicationGroupMsgId?: string;
    /**
     * The identifier (ID) of the Transaction.
     */
    xid?: string;
}

export namespace MsgVpnTransactionConsumerMsg {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'MsgVpnTransactionConsumerMsg';


}