/* eslint-disable */


export type MessagingServiceScan = {
    readonly createdTime?: string;
    readonly updatedTime?: string;
    readonly createdBy?: string;
    readonly changedBy?: string;
    /**
     * Primary key set by the server.
     */
    readonly id?: string;
    /**
     * The status of the messaging service scan.
     */
    readonly status?: string;
    /**
     * The description of the messaging service scan status.
     */
    readonly statusDescription?: string;
    /**
     * The messagingServiceId of the scan.
     */
    readonly messagingServiceId?: string;
    /**
     * The messagingServiceName of the scan.
     */
    readonly messagingServiceName?: string;
    /**
     * The scanTypes that were requested for the scan.
     */
    readonly scanTypes?: string;
    /**
     * The destinations which EMA will send the scan results.
     */
    readonly destinations?: string;
    readonly type?: string;
}

export namespace MessagingServiceScan {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'MessagingServiceScan';


}