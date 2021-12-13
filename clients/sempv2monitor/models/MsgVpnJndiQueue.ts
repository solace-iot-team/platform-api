/* eslint-disable */


export type MsgVpnJndiQueue = {
    /**
     * The name of the Message VPN.
     */
    msgVpnName?: string;
    /**
     * The physical name of the JMS Queue.
     */
    physicalName?: string;
    /**
     * The JNDI name of the JMS Queue.
     */
    queueName?: string;
}

export namespace MsgVpnJndiQueue {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'MsgVpnJndiQueue';


}