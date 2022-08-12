/* eslint-disable */


import type { EnumValue } from './EnumValue';

export type EnumVersion = {
    readonly createdTime?: string;
    readonly updatedTime?: string;
    readonly createdBy?: string;
    readonly changedBy?: string;
    readonly id?: string;
    enumId: string;
    description?: string;
    version: string;
    displayName?: string;
    values: Array<EnumValue>;
    readonly referencedByEventVersionIds?: Array<string>;
    readonly referencedByTopicDomainIds?: Array<string>;
    readonly stateId?: string;
    readonly type?: string;
}

export namespace EnumVersion {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'EnumVersion';


}