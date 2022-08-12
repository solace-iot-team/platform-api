/* eslint-disable */


export type Application = {
    readonly createdTime?: string;
    readonly updatedTime?: string;
    readonly createdBy?: string;
    readonly changedBy?: string;
    readonly id?: string;
    name: string;
    applicationType: string;
    applicationDomainId: string;
    readonly numberOfVersions?: number;
    type?: string;
}

export namespace Application {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'Application';


}