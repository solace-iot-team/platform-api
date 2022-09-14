/* eslint-disable */


export type MsgVpnClientUsernameAttribute = {
    /**
     * The name of the Attribute.
     */
    attributeName?: string;
    /**
     * The value of the Attribute.
     */
    attributeValue?: string;
    /**
     * The name of the Client Username.
     */
    clientUsername?: string;
    /**
     * The name of the Message VPN.
     */
    msgVpnName?: string;
}

export namespace MsgVpnClientUsernameAttribute {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'MsgVpnClientUsernameAttribute';


}