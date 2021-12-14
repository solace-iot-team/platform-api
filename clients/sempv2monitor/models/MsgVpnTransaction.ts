/* eslint-disable */


export type MsgVpnTransaction = {
    /**
     * The identifier (ID) of the Client.
     */
    clientId?: number;
    /**
     * The name of the Client.
     */
    clientName?: string;
    /**
     * The username of the Client.
     */
    clientUsername?: string;
    /**
     * The number of seconds before an idle Transaction may be automatically rolled back and freed.
     */
    idleTimeout?: number;
    /**
     * The name of the Message VPN.
     */
    msgVpnName?: string;
    /**
     * Indicates whether the Transaction is replicated.
     */
    replicated?: boolean;
    /**
     * The name of the Transacted Session for the Transaction.
     */
    sessionName?: string;
    /**
     * The state of the Transaction. The allowed values and their meaning are:
     *
     * <pre>
     * "active" - The Transaction was started.
     * "suspended" - The Transaction was suspended.
     * "idle" - The Transaction was ended.
     * "prepared" - The Transaction was prepared.
     * "complete" - The Transaction was committed or rolled back.
     * </pre>
     *
     */
    state?: string;
    /**
     * The number of seconds the Transaction has remained in the current state.
     */
    timeInState?: number;
    /**
     * The type of Transaction. The allowed values and their meaning are:
     *
     * <pre>
     * "xa" - The Transaction is an XA Transaction.
     * "local" - The Transaction is a local Transaction.
     * </pre>
     *
     */
    type?: string;
    /**
     * The identifier (ID) of the Transaction.
     */
    xid?: string;
}

export namespace MsgVpnTransaction {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'MsgVpnTransaction';


}