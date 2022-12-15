/* eslint-disable */


export type ApplicationRegistration = {
    readonly createdTime?: string;
    readonly updatedTime?: string;
    readonly createdBy?: string;
    readonly changedBy?: string;
    readonly id?: string;
    applicationDomainId: string;
    registrationId: string;
    readonly applicationId?: string;
    name: string;
    readonly type?: string;
    customAttributes?: Record<string, string>;
}

export namespace ApplicationRegistration {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'ApplicationRegistration';


}