/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type Event = {
    readonly createdTime?: number;
    readonly updatedTime?: number;
    readonly createdBy?: string;
    readonly changedBy?: string;
    readonly id?: string;
    name?: string;
    readonly version?: string;
    shared?: boolean;
    topicName?: string;
    description?: string;
    schemaId?: string;
    applicationDomainId?: string;
    revisionComment?: string;
    readonly producedApplicationIds?: Event.producedApplicationIds;
    readonly consumedApplicationIds?: Event.consumedApplicationIds;
    readonly revisionNumber?: number;
    brokerType?: Event.brokerType;
    type?: string;
}

export namespace Event {

    export enum producedApplicationIds {
        _12345678 = '12345678',
        _23456789 = '23456789',
    }

    export enum consumedApplicationIds {
        _12345678 = '12345678',
        _23456789 = '23456789',
    }

    export enum brokerType {
        UNSPECIFIED = 'unspecified',
        SOLACE = 'solace',
        KAFKA = 'kafka',
    }


}
