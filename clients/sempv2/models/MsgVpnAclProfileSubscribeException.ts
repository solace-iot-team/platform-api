/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type MsgVpnAclProfileSubscribeException = {
    /**
     * The name of the ACL Profile. Deprecated since 2.14. Replaced by subscribeTopicExceptions.
     */
    aclProfileName?: string;
    /**
     * The name of the Message VPN. Deprecated since 2.14. Replaced by subscribeTopicExceptions.
     */
    msgVpnName?: string;
    /**
     * The topic for the exception to the default action taken. May include wildcard characters. Deprecated since 2.14. Replaced by subscribeTopicExceptions.
     */
    subscribeExceptionTopic?: string;
    /**
     * The syntax of the topic for the exception to the default action taken. The allowed values and their meaning are:
     *
     * <pre>
     * "smf" - Topic uses SMF syntax.
     * "mqtt" - Topic uses MQTT syntax.
     * </pre>
     * Deprecated since 2.14. Replaced by subscribeTopicExceptions.
     */
    topicSyntax?: MsgVpnAclProfileSubscribeException.topicSyntax;
}

export namespace MsgVpnAclProfileSubscribeException {

    /**
     * The syntax of the topic for the exception to the default action taken. The allowed values and their meaning are:
     *
     * <pre>
     * "smf" - Topic uses SMF syntax.
     * "mqtt" - Topic uses MQTT syntax.
     * </pre>
     * Deprecated since 2.14. Replaced by subscribeTopicExceptions.
     */
    export enum topicSyntax {
        SMF = 'smf',
        MQTT = 'mqtt',
    }


}
