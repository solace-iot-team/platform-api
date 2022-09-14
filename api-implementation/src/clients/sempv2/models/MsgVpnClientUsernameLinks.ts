/* eslint-disable */


export type MsgVpnClientUsernameLinks = {
    /**
     * The URI of this Client Username's collection of Client Username Attribute objects. Available since 2.27.
     */
    attributesUri?: string;
    /**
     * The URI of this Client Username object.
     */
    uri?: string;
}

export namespace MsgVpnClientUsernameLinks {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'MsgVpnClientUsernameLinks';


}