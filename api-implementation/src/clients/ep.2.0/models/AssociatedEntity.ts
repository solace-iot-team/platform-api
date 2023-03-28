/* eslint-disable */


export type AssociatedEntity = {
    entityType?: string;
    applicationDomainIds?: Array<string>;
}

export namespace AssociatedEntity {

    /**
     * the discriminator for the model if required for more complex api's
     */
    export const discriminator = 'AssociatedEntity';


}