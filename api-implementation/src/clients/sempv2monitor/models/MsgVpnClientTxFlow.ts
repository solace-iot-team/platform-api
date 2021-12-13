/* eslint-disable */


export type MsgVpnClientTxFlow = {
    /**
     * The name of the Client.
     */
    clientName?: string;
    /**
     * The name of the Queue or Topic Endpoint bound.
     */
    endpointName?: string;
    /**
     * The type of endpoint bound. The allowed values and their meaning are:
     *
     * <pre>
     * "queue" - The Client is bound to a Queue.
     * "topic-endpoint" - The Client is bound to a Topic Endpoint.
     * </pre>
     *
     */
    endpointType?: string;
    /**
     * The identifier (ID) of the flow.
     */
    flowId?: number;
    /**
     * The name of the Message VPN.
     */
    msgVpnName?: string;
}

export namespace MsgVpnClientTxFlow {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'MsgVpnClientTxFlow';


}