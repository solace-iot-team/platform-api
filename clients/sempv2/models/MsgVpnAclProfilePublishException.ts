/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export interface MsgVpnAclProfilePublishException {
    /**
     * The name of the ACL Profile. Deprecated since 2.14. Replaced by publishTopicExceptions.
     */
    aclProfileName?: string;
    /**
     * The name of the Message VPN. Deprecated since 2.14. Replaced by publishTopicExceptions.
     */
    msgVpnName?: string;
    /**
     * The topic for the exception to the default action taken. May include wildcard characters. Deprecated since 2.14. Replaced by publishTopicExceptions.
     */
    publishExceptionTopic?: string;
    /**
     * The syntax of the topic for the exception to the default action taken. The allowed values and their meaning are:
     *
     * <pre>
     * "smf" - Topic uses SMF syntax.
     * "mqtt" - Topic uses MQTT syntax.
     * </pre>
     * Deprecated since 2.14. Replaced by publishTopicExceptions.
     */
    topicSyntax?: MsgVpnAclProfilePublishException.topicSyntax;
}

export namespace MsgVpnAclProfilePublishException {

    /**
     * The syntax of the topic for the exception to the default action taken. The allowed values and their meaning are:
     *
     * <pre>
     * "smf" - Topic uses SMF syntax.
     * "mqtt" - Topic uses MQTT syntax.
     * </pre>
     * Deprecated since 2.14. Replaced by publishTopicExceptions.
     */
    export enum topicSyntax {
        SMF = 'smf',
        MQTT = 'mqtt',
    }


}
