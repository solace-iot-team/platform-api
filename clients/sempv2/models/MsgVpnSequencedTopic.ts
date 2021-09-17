/* eslint-disable */


export type MsgVpnSequencedTopic = {
    /**
     * The name of the Message VPN.
     */
    msgVpnName?: string;
    /**
     * Topic for applying sequence numbers.
     */
    sequencedTopic?: string;
}

export namespace MsgVpnSequencedTopic {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'MsgVpnSequencedTopic';


}