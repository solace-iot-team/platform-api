/* eslint-disable */


import type { AddressLevel } from './AddressLevel';

export type SuggestionApiInputDTO = {
    readonly createdTime?: string;
    readonly updatedTime?: string;
    readonly createdBy?: string;
    readonly changedBy?: string;
    addressLevels: Array<AddressLevel>;
    brokerType?: string;
    addressType?: SuggestionApiInputDTO.addressType;
    id?: string;
    type?: string;
}

export namespace SuggestionApiInputDTO {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'SuggestionApiInputDTO';

    export enum addressType {
        topic = 'topic',
    }


}