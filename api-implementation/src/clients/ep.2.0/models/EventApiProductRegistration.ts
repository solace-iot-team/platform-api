/* eslint-disable */


export type EventApiProductRegistration = {
    readonly createdTime?: string;
    readonly updatedTime?: string;
    readonly createdBy?: string;
    readonly changedBy?: string;
    readonly id?: string;
    applicationDomainId: string;
    registrationId: string;
    accessRequestId: string;
    eventApiProductVersionId: string;
    planId: string;
    state?: EventApiProductRegistration.state;
    /**
     * The type of payload
     */
    readonly type: string;
    customAttributes?: Record<string, string>;
}

export namespace EventApiProductRegistration {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'EventApiProductRegistration';

    export enum state {
        PendingApproval = 'Pending Approval',
        Rejected = 'Rejected',
        Revoked = 'Revoked',
        Approved = 'Approved',
        Error = 'Error',
        Live = 'Live',
    }


}