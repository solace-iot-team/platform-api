/* eslint-disable */


export type MessagingServiceScanLog = {
    readonly createdTime?: string;
    /**
     * Primary key set by the server.
     */
    readonly id?: string;
    /**
     * The ID of the scan.
     */
    readonly scanId?: string;
    /**
     * The log message.
     */
    readonly log?: string;
    /**
     * The level of the log message.
     */
    readonly logLevel?: string;
    readonly type?: string;
}

export namespace MessagingServiceScanLog {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'MessagingServiceScanLog';


}