/* eslint-disable */


export type MsgVpnAclProfileLinks = {
    /**
     * The URI of this ACL Profile's collection of Client Connect Exception objects.
     */
    clientConnectExceptionsUri?: string;
    /**
     * The URI of this ACL Profile's collection of Publish Topic Exception objects. Deprecated since 2.14. Replaced by publishTopicExceptions.
     */
    publishExceptionsUri?: string;
    /**
     * The URI of this ACL Profile's collection of Publish Topic Exception objects. Available since 2.14.
     */
    publishTopicExceptionsUri?: string;
    /**
     * The URI of this ACL Profile's collection of Subscribe Topic Exception objects. Deprecated since 2.14. Replaced by subscribeTopicExceptions.
     */
    subscribeExceptionsUri?: string;
    /**
     * The URI of this ACL Profile's collection of Subscribe Share Name Exception objects. Available since 2.14.
     */
    subscribeShareNameExceptionsUri?: string;
    /**
     * The URI of this ACL Profile's collection of Subscribe Topic Exception objects. Available since 2.14.
     */
    subscribeTopicExceptionsUri?: string;
    /**
     * The URI of this ACL Profile object.
     */
    uri?: string;
}

export namespace MsgVpnAclProfileLinks {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'MsgVpnAclProfileLinks';


}