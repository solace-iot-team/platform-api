/* eslint-disable */


import type { CustomAttribute } from './CustomAttribute';

export type Application = {
    readonly createdTime?: string;
    readonly updatedTime?: string;
    readonly createdBy?: string;
    readonly changedBy?: string;
    readonly id?: string;
    name: string;
    applicationType: string;
    brokerType: Application.brokerType;
    applicationDomainId: string;
    readonly numberOfVersions?: number;
    customAttributes?: Array<CustomAttribute>;
    type?: string;
}

export namespace Application {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'Application';

    export enum brokerType {
        kafka = 'kafka',
        solace = 'solace',
    }


}