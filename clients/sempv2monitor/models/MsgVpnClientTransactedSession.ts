/* eslint-disable */


export type MsgVpnClientTransactedSession = {
    /**
     * The name of the Client.
     */
    clientName?: string;
    /**
     * The number of transactions committed within the Transacted Session.
     */
    commitCount?: number;
    /**
     * The number of transaction commit operations that failed.
     */
    commitFailureCount?: number;
    /**
     * The number of transaction commit operations that succeeded.
     */
    commitSuccessCount?: number;
    /**
     * The number of messages consumed within the Transacted Session.
     */
    consumedMsgCount?: number;
    /**
     * The number of transaction end fail operations that failed.
     */
    endFailFailureCount?: number;
    /**
     * The number of transaction end fail operations that succeeded.
     */
    endFailSuccessCount?: number;
    /**
     * The number of transaction end operations that failed.
     */
    endFailureCount?: number;
    /**
     * The number of transaction end rollback operations that failed.
     */
    endRollbackFailureCount?: number;
    /**
     * The number of transaction end rollback operations that succeeded.
     */
    endRollbackSuccessCount?: number;
    /**
     * The number of transaction end operations that succeeded.
     */
    endSuccessCount?: number;
    /**
     * The number of transactions that failed within the Transacted Session.
     */
    failureCount?: number;
    /**
     * The number of transaction forget operations that failed.
     */
    forgetFailureCount?: number;
    /**
     * The number of transaction forget operations that succeeded.
     */
    forgetSuccessCount?: number;
    /**
     * The name of the Message VPN.
     */
    msgVpnName?: string;
    /**
     * The number of transaction one-phase commit operations that failed.
     */
    onePhaseCommitFailureCount?: number;
    /**
     * The number of transaction one-phase commit operations that succeeded.
     */
    onePhaseCommitSuccessCount?: number;
    /**
     * The number of messages to be consumed when the transaction is committed.
     */
    pendingConsumedMsgCount?: number;
    /**
     * The number of messages to be published when the transaction is committed.
     */
    pendingPublishedMsgCount?: number;
    /**
     * The number of transaction prepare operations that failed.
     */
    prepareFailureCount?: number;
    /**
     * The number of transaction prepare operations that succeeded.
     */
    prepareSuccessCount?: number;
    /**
     * The state of the previous transaction. The allowed values and their meaning are:
     *
     * <pre>
     * "none" - The previous transaction had no state.
     * "committed" - The previous transaction was committed.
     * "rolled-back" - The previous transaction was rolled back.
     * "failed" - The previous transaction failed.
     * </pre>
     *
     */
    previousTransactionState?: string;
    /**
     * The number of messages published within the Transacted Session.
     */
    publishedMsgCount?: number;
    /**
     * The number of transaction resume operations that failed.
     */
    resumeFailureCount?: number;
    /**
     * The number of transaction resume operations that succeeded.
     */
    resumeSuccessCount?: number;
    /**
     * The number of messages retrieved within the Transacted Session.
     */
    retrievedMsgCount?: number;
    /**
     * The number of transactions rolled back within the Transacted Session.
     */
    rollbackCount?: number;
    /**
     * The number of transaction rollback operations that failed.
     */
    rollbackFailureCount?: number;
    /**
     * The number of transaction rollback operations that succeeded.
     */
    rollbackSuccessCount?: number;
    /**
     * The name of the Transacted Session.
     */
    sessionName?: string;
    /**
     * The number of messages spooled within the Transacted Session.
     */
    spooledMsgCount?: number;
    /**
     * The number of transaction start operations that failed.
     */
    startFailureCount?: number;
    /**
     * The number of transaction start operations that succeeded.
     */
    startSuccessCount?: number;
    /**
     * The number of transactions that succeeded within the Transacted Session.
     */
    successCount?: number;
    /**
     * The number of transaction suspend operations that failed.
     */
    suspendFailureCount?: number;
    /**
     * The number of transaction suspend operations that succeeded.
     */
    suspendSuccessCount?: number;
    /**
     * The identifier (ID) of the transaction in the Transacted Session.
     */
    transactionId?: number;
    /**
     * The state of the current transaction. The allowed values and their meaning are:
     *
     * <pre>
     * "in-progress" - The current transaction is in progress.
     * "committing" - The current transaction is committing.
     * "rolling-back" - The current transaction is rolling back.
     * "failing" - The current transaction is failing.
     * </pre>
     *
     */
    transactionState?: string;
    /**
     * The number of transaction two-phase commit operations that failed.
     */
    twoPhaseCommitFailureCount?: number;
    /**
     * The number of transaction two-phase commit operations that succeeded.
     */
    twoPhaseCommitSuccessCount?: number;
}

export namespace MsgVpnClientTransactedSession {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'MsgVpnClientTransactedSession';


}