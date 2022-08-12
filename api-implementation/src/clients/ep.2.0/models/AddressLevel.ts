/* eslint-disable */


export type AddressLevel = {
    name: string;
    addressLevelType: AddressLevel.addressLevelType;
    enumVersionId?: string;
}

export namespace AddressLevel {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'AddressLevel';

    export enum addressLevelType {
        literal = 'literal',
        variable = 'variable',
    }


}