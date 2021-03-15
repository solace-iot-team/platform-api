/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type MsgVpnJndiQueue = {
    /**
     * The name of the Message VPN.
     */
    msgVpnName?: string;
    /**
     * The physical name of the JMS Queue. The default value is `""`.
     */
    physicalName?: string;
    /**
     * The JNDI name of the JMS Queue.
     */
    queueName?: string;
}
