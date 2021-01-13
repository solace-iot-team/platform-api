/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export interface Application {
    readonly createdTime?: number;
    readonly updatedTime?: number;
    readonly createdBy?: string;
    readonly changedBy?: string;
    readonly id?: string;
    name: string;
    readonly version?: string;
    description?: string;
    applicationDomainId: string;
    revisionComment?: string;
    producedEventIds?: Application.producedEventIds;
    consumedEventIds?: Application.consumedEventIds;
    readonly revisionNumber?: Application.revisionNumber;
    applicationClass?: Application.applicationClass;
    readonly type?: string;
}

export namespace Application {

    export enum producedEventIds {
        _12345678 = '12345678',
        _23456789 = '23456789',
    }

    export enum consumedEventIds {
        _12345678 = '12345678',
        _23456789 = '23456789',
    }

    export enum revisionNumber {
        _12345678 = 12345678,
        _23456789 = 23456789,
    }

    export enum applicationClass {
        UNSPECIFIED = 'unspecified',
        KAFKA_CONNECTOR = 'kafka_connector',
        SOLACE_CONNECTOR = 'solace_connector',
        KAFKA_APPLICATION = 'kafka_application',
    }


}
