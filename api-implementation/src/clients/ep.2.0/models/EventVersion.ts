/* eslint-disable */


import type { AttractingApplicationVersionTuple } from './AttractingApplicationVersionTuple';
import type { CustomAttribute } from './CustomAttribute';
import type { DeliveryDescriptor } from './DeliveryDescriptor';

export type EventVersion = {
    readonly createdTime?: string;
    readonly updatedTime?: string;
    readonly createdBy?: string;
    readonly changedBy?: string;
    readonly id?: string;
    eventId: string;
    description?: string;
    version: string;
    displayName?: string;
    readonly declaredProducingApplicationVersionIds?: Array<string>;
    readonly declaredConsumingApplicationVersionIds?: Array<string>;
    readonly producingEventApiVersionIds?: Array<string>;
    readonly consumingEventApiVersionIds?: Array<string>;
    readonly attractingApplicationVersionIds?: Array<AttractingApplicationVersionTuple>;
    schemaVersionId?: string;
    schemaPrimitiveType?: EventVersion.schemaPrimitiveType;
    deliveryDescriptor?: DeliveryDescriptor;
    readonly stateId?: string;
    customAttributes?: Array<CustomAttribute>;
    readonly messagingServiceIds?: Array<string>;
    type?: string;
}

export namespace EventVersion {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'EventVersion';

    export enum schemaPrimitiveType {
        BOOLEAN = 'BOOLEAN',
        BYTES = 'BYTES',
        DOUBLE = 'DOUBLE',
        FLOAT = 'FLOAT',
        INT = 'INT',
        LONG = 'LONG',
        NULL = 'NULL',
        NUMBER = 'NUMBER',
        STRING = 'STRING',
    }


}