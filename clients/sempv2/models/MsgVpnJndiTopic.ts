/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export interface MsgVpnJndiTopic {
    /**
     * The name of the Message VPN.
     */
    msgVpnName?: string;
    /**
     * The physical name of the JMS Topic. The default value is `""`.
     */
    physicalName?: string;
    /**
     * The JNDI name of the JMS Topic.
     */
    topicName?: string;
}
