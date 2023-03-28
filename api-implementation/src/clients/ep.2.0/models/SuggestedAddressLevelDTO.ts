/* eslint-disable */


import type { TopicAddressEnumVersion } from './TopicAddressEnumVersion';

export type SuggestedAddressLevelDTO = {
    name: string;
    addressLevelType: SuggestedAddressLevelDTO.addressLevelType;
    enumVersionId?: string;
    enumVersion?: TopicAddressEnumVersion;
}

export namespace SuggestedAddressLevelDTO {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'SuggestedAddressLevelDTO';

    export enum addressLevelType {
        literal = 'literal',
        variable = 'variable',
    }


}