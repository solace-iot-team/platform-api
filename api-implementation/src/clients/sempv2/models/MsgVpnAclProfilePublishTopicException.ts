/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export interface MsgVpnAclProfilePublishTopicException {
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
    publishTopicException?: string;
    /**
     * The syntax of the topic for the exception to the default action taken. The allowed values and their meaning are:
     *
     * <pre>
     * "smf" - Topic uses SMF syntax.
     * "mqtt" - Topic uses MQTT syntax.
     * </pre>
     *
     */
    publishTopicExceptionSyntax?: MsgVpnAclProfilePublishTopicException.publishTopicExceptionSyntax;
}

export namespace MsgVpnAclProfilePublishTopicException {

    /**
     * The syntax of the topic for the exception to the default action taken. The allowed values and their meaning are:
     *
     * <pre>
     * "smf" - Topic uses SMF syntax.
     * "mqtt" - Topic uses MQTT syntax.
     * </pre>
     *
     */
    export enum publishTopicExceptionSyntax {
        SMF = 'smf',
        MQTT = 'mqtt',
    }


}
