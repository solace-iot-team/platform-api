/* eslint-disable */


export type MsgVpnQueuePriority = {
    /**
     * The name of the Message VPN.
     */
    msgVpnName?: string;
    /**
     * The level of the Priority, from 9 (highest) to 0 (lowest).
     */
    priority?: number;
    /**
     * The name of the Queue.
     */
    queueName?: string;
    /**
     * The amount of guaranteed messages at this Priority spooled by the Queue, in bytes (B).
     */
    spooledByteCount?: number;
    /**
     * The number of guaranteed messages at this Priority spooled by the Queue.
     */
    spooledMsgCount?: number;
}

export namespace MsgVpnQueuePriority {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'MsgVpnQueuePriority';


}