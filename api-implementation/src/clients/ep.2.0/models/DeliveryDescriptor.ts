/* eslint-disable */


import type { Address } from './Address';

export type DeliveryDescriptor = {
    readonly createdTime?: string;
    readonly updatedTime?: string;
    readonly createdBy?: string;
    readonly changedBy?: string;
    brokerType?: string;
    address?: Address;
    keySchemaVersionId?: string;
    keySchemaPrimitiveType?: DeliveryDescriptor.keySchemaPrimitiveType;
    id?: string;
    type?: string;
}

export namespace DeliveryDescriptor {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'DeliveryDescriptor';

    export enum keySchemaPrimitiveType {
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