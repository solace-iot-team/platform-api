/* eslint-disable */


export type MsgVpnTransactionPublisherMsg = {
    /**
     * The identifier (ID) of the Message.
     */
    msgId?: number;
    /**
     * The name of the Message VPN.
     */
    msgVpnName?: string;
    /**
     * The topic destination of the Message.
     */
    topic?: string;
    /**
     * The identifier (ID) of the Transaction.
     */
    xid?: string;
}

export namespace MsgVpnTransactionPublisherMsg {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'MsgVpnTransactionPublisherMsg';


}