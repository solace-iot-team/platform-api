/* eslint-disable */


export type MsgVpnTopicEndpointPriority = {
    /**
     * The name of the Message VPN.
     */
    msgVpnName?: string;
    /**
     * The level of the Priority, from 9 (highest) to 0 (lowest).
     */
    priority?: number;
    /**
     * The amount of guaranteed messages at this Priority spooled by the Topic Endpoint, in bytes (B).
     */
    spooledByteCount?: number;
    /**
     * The number of guaranteed messages at this Priority spooled by the Topic Endpoint.
     */
    spooledMsgCount?: number;
    /**
     * The name of the Topic Endpoint.
     */
    topicEndpointName?: string;
}

export namespace MsgVpnTopicEndpointPriority {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'MsgVpnTopicEndpointPriority';


}