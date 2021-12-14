/* eslint-disable */


export type MsgVpnAclProfileSubscribeTopicException = {
    /**
     * The name of the ACL Profile.
     */
    aclProfileName?: string;
    /**
     * The name of the Message VPN.
     */
    msgVpnName?: string;
    /**
     * The topic for the exception to the default action taken. May include wildcard characters.
     */
    subscribeTopicException?: string;
    /**
     * The syntax of the topic for the exception to the default action taken. The allowed values and their meaning are:
     *
     * <pre>
     * "smf" - Topic uses SMF syntax.
     * "mqtt" - Topic uses MQTT syntax.
     * </pre>
     *
     */
    subscribeTopicExceptionSyntax?: MsgVpnAclProfileSubscribeTopicException.subscribeTopicExceptionSyntax;
}

export namespace MsgVpnAclProfileSubscribeTopicException {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'MsgVpnAclProfileSubscribeTopicException';

    /**
     * The syntax of the topic for the exception to the default action taken. The allowed values and their meaning are:
     *
     * <pre>
     * "smf" - Topic uses SMF syntax.
     * "mqtt" - Topic uses MQTT syntax.
     * </pre>
     *
     */
    export enum subscribeTopicExceptionSyntax {
        SMF = 'smf',
        MQTT = 'mqtt',
    }


}