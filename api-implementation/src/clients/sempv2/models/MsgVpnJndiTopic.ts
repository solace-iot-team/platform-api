/* eslint-disable */


export type MsgVpnJndiTopic = {
    /**
     * The name of the Message VPN.
     */
    msgVpnName?: string;
    /**
     * The physical name of the JMS Topic. Changes to this attribute are synchronized to HA mates and replication sites via config-sync. The default value is `""`.
     */
    physicalName?: string;
    /**
     * The JNDI name of the JMS Topic.
     */
    topicName?: string;
}

export namespace MsgVpnJndiTopic {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'MsgVpnJndiTopic';


}