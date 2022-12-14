/* eslint-disable */


export type MessagingServiceScanData = {
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
     * The type of dataCollection this object holds scan data for.
     */
    readonly dataCollectionType?: string;
    /**
     * The scan data in JSON format.
     */
    readonly data?: string;
    readonly type?: string;
}

export namespace MessagingServiceScanData {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'MessagingServiceScanData';


}